<template>
  <div class="title">
    <q-header reveal elevated class="bg-light-blue text-white">
      <q-toolbar class="bg-light-blue text-white">
        <img src="@/app/assets/logo.png" height="30px" />
        <q-toolbar-title>Mius</q-toolbar-title>
        <q-btn dense flat round icon="settings" size="12px" color="yellow" class="no-drag" @click="showSetting">
          <q-tooltip anchor="center left" self="center middle">{{ $t("setting") }}</q-tooltip>
        </q-btn>
        <q-icon name="more_vert" style="font-size: 1.718em;" />
        <q-btn dense flat round icon="lens" size="12px" color="green" class="no-drag" @click="close('min')">
          <q-tooltip anchor="center left" self="center middle">{{ $t("minimize") }}</q-tooltip>
        </q-btn>
        <q-btn dense flat round icon="lens" size="12px" color="red" class="no-drag" @click="close('close')">
          <q-tooltip anchor="center left" self="center middle">
            <strong>{{ $t("close") }}</strong>
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-dialog v-model="isSettingsShow">
      <q-card style="height: 300px;width:300px;-webkit-user-select: none;">
        <q-toolbar>
          <q-toolbar-title>
            <span class="text-weight-bold">{{ $t("setting") }}</span>
          </q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-list>
          <q-item>
            <q-item-section>
              <q-select v-model="lang" emit-value map-options options-dense :options="langOptions"
                class="setting-select" @input="changeLang">
                <template v-slot:prepend>{{ $t("languages") }}：</template>
              </q-select>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-btn-dropdown color="light-green" :label="$t('importYgoLabel')">
                <q-list>
                  <q-item clickable v-close-popup @click="settingYgo('serve7210')">
                    <q-item-section>
                      <q-item-label>YGOPRO 7210</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="settingYgo('serve222')">
                    <q-item-section>
                      <q-item-label>YGOPRO 222</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="settingYgo('serve1311')">
                    <q-item-section>
                      <q-item-label>YGOPRO 1311</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div class="q-gutter-sm">
                关闭主面板：
                <q-radio v-model="shape" val="teal" label="最小化到系统托盘" color="teal" />
                <q-radio v-model="shape" val="orange" label="退出Mius" color="orange" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
  import {
    mapActions
  } from 'vuex';
  import servers from "@/app/config/server";
  import path from "path";
  import {
    ipcRenderer as ipc
  } from "electron";
  import {
    remote
  } from "electron";
  const dialog = remote.dialog;
  export default {
    name: "Title",
    data() {
      return {
        shape: 'line',
        languages: [{
            isoName: "zh-hans",
            nativeName: "简体中文"
          },
          {
            isoName: "en-us",
            nativeName: "English"
          }
        ],
        lang: this.$q.lang.isoName,
        closeColor: "#ffffff"
      };
    },
    computed: {
      isSettingsShow: {
        get: function () {
          return this.$store.state.setting.isSettingsShow
        },
        set: function (value) {
          this.showSettings({
            value,
          })
        }
      }
    },
    methods: {
      ...mapActions('setting', [
        'showSettings',
      ]),
      showSetting() {
        this.showSettings({
          value: true,
        })
      },
      settingYgo(name) {
        let isWin = 'win32' == process.platform
        let server = servers[name]
        let properties = ["openFile"];
        let filters = [{
          name: "*",
          extensions: ["*"]
        }]
        if (isWin) {
          properties = ["openFile"];
          filters = [{
            name: "Exe",
            extensions: ["exe"]
          }];
        }
        let files = dialog.showOpenDialogSync({
          title: this.$t("ygoDialogTitle"),
          properties,
          center: true,
          filters
        })
        if (files != null) {
          let dir = path.resolve(files[0], "..");
          let winpath = files[0];
          localStorage.setItem(server.path, dir)
          localStorage.setItem(server.program, winpath)
          this.$q.notify({
            color: 'positive',
            icon: 'done',
            message: this.$t("setOk"),
            position: "top",
            timeout: 3000
          })
        }
      },
      changeLang(lang) {
        this.setting = false;
        this.showLoading();
        this.setLang(lang);
        ipc.send('changeLanguages', lang)
      },
      close(clicktype) {
        ipc.send(clicktype);
      },
      closeOver() {
        this.closeColor = "red";
      },
      closeOut() {
        this.closeColor = "#ffffff";
      },
      showLoading() {
        this.$q.loading.show({
          message: this.$t("settingMsg")
        });
        let router = localStorage.getItem("router");
        this.timer = setTimeout(() => {
          this.$router.replace({
            name: "SupplierAllBack",
            params: {
              name: router
            }
          });
          this.$q.loading.hide();
          this.timer = void 0;
        }, 1000);
      },
      setLang(lang) {
        this.$i18n.locale = lang;
        localStorage.setItem("lang", lang);
        import(`quasar/lang/${lang}`).then(lang => {
          this.$q.lang.set(lang.default);
        });
      }
    },
    mounted() {
      ipc.on('setting', (event, message) => {
        console.log(message)
        this.showSetting()
      })
    },
    eforeDestroy() {
      if (this.timer !== void 0) {
        clearTimeout(this.timer);
        this.$q.loading.hide();
      }
    },
    created() {
      let lang = "zh-hans";
      let locale = localStorage.getItem('locale') || remote.app.getLocale();
      if (locale.startsWith('zh-')) {
        lang = "zh-hans";
      } else {
        lang = "en-us";
      }
      this.lang = lang;
      this.langOptions = this.languages.map(lang => ({
        label: lang.nativeName,
        value: lang.isoName
      }));
      this.setLang(lang);
      ipc.send('changeLanguages', lang)
    }
  };
</script>
<style>
  .no-drag {
    -webkit-app-region: no-drag;
  }

  .title .q-toolbar {
    padding: 0 5px;
    -webkit-app-region: drag;
  }

  .title .q-toolbar__title:first-child {
    padding-left: 10px;
  }

  .title .q-toolbar__title {
    padding: 0 4px;
    font-size: 20px;
  }

  .title .q-gutter-sm>* {
    margin-left: 0;
  }

  .setting-select .q-field__control,
  .q-field__native {
    min-height: 30px !important;
  }

  .setting-select .q-field__marginal {
    height: 40px;
    font-size: 14px;
  }

  .setting-select .q-field__before,
  .q-field__prepend {
    padding-right: 0;
    width: 100px;
  }
</style>