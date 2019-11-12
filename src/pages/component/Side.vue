<template>
  <div class="side">
    <q-drawer show-if-above side="left" overlay elevated behavior="desktop" :width="200" :persistent="true">
      <q-scroll-area :thumb-style="thumbStyle" style="height: calc(100% - 50px);">
        <div class="side-list">
          <q-list class="text-blue-9">
            <q-item-label header>服务器信息</q-item-label>
            <q-item class="q-my-sm" clickable :active="link === 'Serve7210'" active-class="active-link"
              @click="menuClick('Serve7210')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="cloud" size="xs" />YGOPRO 7210
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable :active="link === 'Serve222'" active-class="active-link"
              @click="menuClick('Serve222')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="cloud" size="xs" />YGOPRO 222
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable :active="link === 'Serve1311'" active-class="active-link"
              @click="menuClick('Serve1311')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="cloud" size="xs" />YGOPRO 1311
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable :active="link === 'MyCard'" active-class="active-link"
              @click="menuClick('Serve1311')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="cloud" size="xs" />MyCard
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item-label header>玩家信息</q-item-label>
            <q-item class="q-my-sm" clickable :active="link === 'Deck'" active-class="active-link"
              @click="menuClick('Serve1311')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="view_module" size="xs" />卡组管理
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable :active="link === 'Replay'" active-class="active-link"
              @click="menuClick('Serve1311')">
              <q-item-section>
                <q-item-label>
                  <q-icon name="replay" size="xs" />录像管理
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
      <q-item class="q-my-sm">
        <q-item-section>
          <div class="version">
            <q-item-label>
              <span>当前版本V1.1.5 </span>
            </q-item-label>
          </div>
        </q-item-section>
        <q-item-section side>
          <div class="version-btn">
          </div>
        </q-item-section>
      </q-item>
    </q-drawer>
  </div>
</template>
<script>
  import {
    remote
  } from 'electron';
  export default {
    name: "Side",
    data() {
      return {
        link: "Serve7210",
      };
    },
    methods: {
      test() {
        let currentWindow = remote.getCurrentWindow()
        if (!currentWindow.isMaximized()) {
          console.log(false)
          currentWindow.maximize()
        } else {
          console.log(true)
          currentWindow.unmaximize()
        }
      },
      menuClick(index) {
        this.link = index;
        localStorage.setItem("router", index);
        this.$router.push({
          name: index
        });
      }
    },
    computed: {
      thumbStyle() {
        return {
          right: "1px",
          borderRadius: "2px",
          backgroundColor: "#027be3",
          width: "8px",
          opacity: 0.5
        };
      }
    }
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

  .version {
    padding-top: 20px;
    font-size: 12px;
  }

  .version-btn .q-btn__content {
    font-size: 12px;
  }
</style>