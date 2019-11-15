<template>
  <div class="server">
    <div class="server-header">
      <q-toolbar class="text-primary">
        <q-input v-model="username" square filled class="server-from server-input">
          <template v-slot:before>用户名：</template>
        </q-input>
        <q-input v-model="roomname" square filled class="server-from server-input">
          <template v-slot:before>房间名：</template>
        </q-input>
        <q-select outlined v-model="gametype" :options="options" class="server-from server-select">
          <template v-slot:before>游戏模式：</template>
        </q-select>
        <q-btn color="white" text-color="black" label="创建房间" class="server-from server-btn"
          @click="joinGame('create')" />
      </q-toolbar>
    </div>
    <div class="server-main">
      <q-table class="table-style" :data="datas" :columns="columns" row-key="name" :pagination.sync="pagination"
        :loading="loading" :rows-per-page-options="pageOptions" :no-data-label="$t('table.noDataLabel')">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props" style="width: 100px;">
              {{ props.row.roomid }}
            </q-td>
            <q-td key="roomname" :props="props">
              {{ props.row.roomname }}
            </q-td>
            <q-td key="users" :props="props" style="width: 150px;">
              <span v-for="n in props.row.users.length" :key="n">
                <q-icon v-if="isGamer(props.row.users[n-1])" name="person" size="sm" class="text-primary">
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    {{props.row.users[n-1].name}}
                  </q-tooltip>
                </q-icon>
              </span>
            </q-td>
            <q-td key="status" :props="props" style="width: 150px;">
              {{ props.row.istart }}
            </q-td>
            <q-td key="action" :props="props" class="table-btn">
              <q-btn color="primary" size="md" label="加入房间" @click="joinGame(props.row)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
<script>
  import {
    mapActions
  } from 'vuex';
  import servers from "@/app/config/server";
  export default {
    name: "Server",
    props: ["name", "label"],
    data() {
      return {
        loading: true,
        timer: null,
        db: null,
        server: null,
        pagination: {
          rowsPerPage: 10
        },
        pageOptions: [10],
        username: "",
        roomname: "",
        gametype: {
          value: "M#",
          label: "比赛"
        },
        options: [{
          value: "",
          label: "单局"
        }, {
          value: "M#",
          label: "比赛"
        }, {
          value: "T#",
          label: "双打"
        }, {
          value: "AI",
          label: "AI"
        }],
        columns: [{
          name: "id",
          label: this.$t("table.id"),
          align: "left",
          field: "id"
        }, {
          name: "roomname",
          align: "left",
          label: this.$t("table.roomname"),
          field: "roomname"
        }, {
          name: "users",
          align: "left",
          label: "玩家",
          field: "users"
        }, {
          name: "status",
          align: "left",
          label: "游戏状态",
          field: "status"
        }, {
          name: "action",
          align: "center",
          label: "操作",
          field: "action"
        }],
        datas: []
      };
    },
    methods: {
      ...mapActions('setting', [
        'showSettings',
      ]),
      setYgo() {
        this.$q.dialog({
          title: this.$t("tips"),
          message: this.$t("tipsMsg"),
          cancel: true,
          persistent: true,
          position: "top",
          style: "margin-top: 150px"
        }).onOk(() => {
          this.showSettings({
            value: true,
          })
        })
      },
      isGamer(user) {
        return user.pos < 4
      },
      joinGame(row) {
        if (!localStorage.getItem(this.server.path)) {
          this.setYgo();
        } else {
          let username = this.username;
          if (username.trim() == "") {
            this.$q.notify({
              color: 'red',
              icon: 'error',
              message: this.$t("usernameMsg"),
              position: "top",
              timeout: 3000
            })
            return;
          }
          let roomname = row == 'create' ? this.gametype.value + this.roomname : row.roomname
          let dir = localStorage.getItem(this.server.path)
          let client = localStorage.getItem(this.server.program)
          let ip = this.server.ip;
          let port = this.server.port;
          this.$ygo.joinGame(dir, client, ip, port, username, roomname);
          localStorage.setItem("username", username);
        }
      },
      showData() {
        let that = this;
        let url = this.server.url;
        this.$http.get(url).then(function (response) {
          let datas = [];
          let rooms = response.data.rooms;
          if (rooms.length) {
            for (let index = 0; index < rooms.length; index++) {
              let room = {};
              room.roomid = rooms[index].roomid;
              room.roomname = rooms[index].roomname;
              room.roommode = rooms[index].roommode;
              room.needpass = rooms[index].needpass;
              room.istart = rooms[index].istart;
              if (room.istart == "wait") {
                room.istart = "等待加入";
                room.sort = 1;
              } else {
                room.sort = 0;
              }
              room.users = rooms[index].users;
              datas.push(room);
              datas.sort(function (room_a, room_b) {
                return room_b.sort - room_a.sort;
              });
            }
          }
          setTimeout(() => {
            that.loading = false;
            that.datas = datas;
          }, 1000)
        });
      }
    },
    created() {
      this.server = servers[this.name]
      this.showData();
      this.timer = setInterval(this.showData, 3000);
      // const date = "C:\\Game\\ImgGen\\killua.cdb";
      // this.db = new this.$sqlite.Database(date);
      if (localStorage.getItem("username")) {
        this.username = localStorage.getItem("username")
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
  };
</script>
<style>
  .server-header {
    font-size: 14px;
  }

  .server-header .q-field__control {
    height: 35px;
  }

  .server-header .q-field__marginal {
    height: 35px;
    font-size: 14px;
  }

  .server-from .q-field__before,
  .q-field__prepend {
    padding-right: 0;
  }

  .server-from {
    margin-left: 10px;
  }

  .server-btn {
    height: 34px;
  }

  .server-input {
    width: 160px;
  }

  .server-header .q-btn {
    min-height: 30px;
  }

  .server-select {
    width: 200px;
  }

  .server-select .q-field__control,
  .q-field__native {
    min-height: 30px !important;
  }

  .table-btn {
    width: 100px;
  }

  .table-btn .q-btn {
    min-height: 20px;
    height: 30px;
  }

  .table-style .q-table__middle {
    max-height: 550px;
  }

  .table-style .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #ffffff
  }

  .table-style thead tr th {
    position: sticky;
    z-index: 1;
  }

  .table-style thead tr:first-child th {
    top: 0
  }

  .table-style .q-table--loading thead tr:last-child th {
    top: 48px
  }
</style>