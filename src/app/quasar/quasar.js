import Vue from 'vue'

import '../styles/quasar.styl'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QScrollArea,
  QTooltip,
  QInput,
  QSelect,
  QTable,
  QTh,
  QTr,
  QTd,
  QDialog,
  ClosePopup,
  QCard,
  QCardSection,
  QCardActions,
  QAvatar,
  Loading,
  Notify,
  Dialog,
  QBtnDropdown,
  QRadio,
  QSplitter,
  QTabs,
  QTab,
  QRouteTab,
  QTabPanels,
  QTabPanel
} from 'quasar'

Vue.use(Quasar, {
  config: {
    framework: {
      i18n: 'de'
    }
  },
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QScrollArea,
    QTooltip,
    QInput,
    QSelect,
    QTable,
    QTh,
    QTr,
    QTd,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QAvatar,
    QBtnDropdown,
    QRadio,
    QSplitter,
    QTabs,
    QTab,
    QRouteTab,
    QTabPanels,
    QTabPanel
  },
  directives: {
    ClosePopup
  },
  plugins: [
    Loading,
    Notify,
    Dialog
  ],
})