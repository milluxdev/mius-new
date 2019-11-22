<template>
  <div class="side">
    <q-drawer show-if-above side="left" overlay elevated behavior="desktop" :width="200" :persistent="true">
      <q-scroll-area :thumb-style="thumbStyle" style="height: calc(100% - 50px);">
        <div class="side-list">
          <q-list class="text-blue-9">
            <q-item-label header>服务器信息</q-item-label>
            <q-item class="q-my-sm" clickable :active="link === 'Server7210'" active-class="active-link"
              @click="menuClick('Server7210')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="cloud" size="xs" />YGOPRO 7210
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable :active="link === 'Server222'" active-class="active-link"
              @click="menuClick('Server222')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="cloud" size="xs" />YGOPRO 222
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable :active="link === 'Server1311'" active-class="active-link"
              @click="menuClick('Server1311')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="cloud" size="xs" />YGOPRO 1311
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable :active="link === 'McServer'" active-class="active-link"
              @click="menuClick('McServer')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="cloud" size="xs" />MyCard
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item-label header>玩家信息</q-item-label>
            <q-item class="q-my-sm" clickable :active="link === 'Deck'" active-class="active-link"
              @click="menuClick('Server1311')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="view_module" size="xs" />卡组管理
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable :active="link === 'Replay'" active-class="active-link"
              @click="menuClick('Server1311')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="replay" size="xs" />录像管理
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
      <div class="side-list">
        <q-list class="text-blue-9">
          <q-item class="q-my-sm" clickable @click="showSetting">
            <q-item-section>
              <q-item-label>
                <q-icon name="settings" size="xs" />设置
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>
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
              <q-select v-model="lang" emit-value map-options options-dense :options="languages"
                class="setting-select" @input="changeLang">
                <template v-slot:prepend>{{ $t("languages") }}：</template>
              </q-select>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-btn-dropdown color="light-green" :label="$t('importYgoLabel')">
                <q-list>
                  <q-item clickable v-close-popup @click="settingYgo('server7210')">
                    <q-item-section>
                      <q-item-label>YGOPRO 7210</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="settingYgo('server222')">
                    <q-item-section>
                      <q-item-label>YGOPRO 222</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="settingYgo('server1311')">
                    <q-item-section>
                      <q-item-label>YGOPRO 1311</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
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
  import {
    ipcRenderer as ipc,
    remote
  } from "electron";
  const dialog = remote.dialog;
  import servers from "@/app/config/server";
  import path from "path";
  export default {
    name: "Side",
    data() {
      return {
        link: "Server7210",
        languages: [{
            value: "zh-hans",
            label: "简体中文"
          },
          {
            value: "en-us",
            label: "English"
          }
        ],
        timer: null,
        lang: this.$q.lang.isoName,
      };
    },
    methods: {
      ...mapActions('setting', [
        'showSettings',
      ]),
      menuClick(index) {
        this.link = index;
        localStorage.setItem("router", index);
        this.$router.push({
          name: index
        });
      },
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
        this.showLoading();
        this.setLang(lang);
        ipc.send('changeLanguages', lang)
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
        this.lang = lang;
        this.$i18n.locale = lang;
        localStorage.setItem("locale", lang);
        import(`quasar/lang/${lang}`).then(lang => {
          this.$q.lang.set(lang.default);
        });
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
      this.setLang(lang);
      ipc.send('changeLanguages', lang)
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
      },
      thumbStyle() {
        return {
          right: "1px",
          borderRadius: "2px",
          backgroundColor: "#027be3",
          width: "8px",
          opacity: 0.5
        };
      },
      version: function () {
        return remote.app.getVersion()
      }
    },
    mounted() {
      ipc.on('setting', () => {
        this.showSetting()
      })
    },
    eforeDestroy() {
      if (this.timer !== void 0) {
        clearTimeout(this.timer);
        this.$q.loading.hide();
      }
    },
  };
</script>

<style>
  .side .q-mb-sm,
  .q-my-sm {
    margin-bottom: 0;
    margin-top: 0;
  }

  .side-list .q-item__label--header {
    font-size: 14px !important;
  }

  .side-list .q-item__label {
    font-size: 13px;
  }

  .side-list .q-icon {
    margin-left: 10px;
    margin-right: 5px;
  }

  .active-link {
    color: white;
    background: #f2c037;
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