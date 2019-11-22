const path = require('path');
module.exports = {lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('app',path.join(__dirname, 'src','app'))
      .set('config',path.join(__dirname, 'src', 'app', 'config'))
      .set('assets',path.join(__dirname, 'src', 'app', 'assets'))
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'Mius',
        appId: 'millux.mius.pro',
        directories: {
          output: 'build'
        },
        dmg: {
          contents: [{
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            },
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ],
          artifactName: "${name}.${ext}"
        },
        mac: {
          icon: 'icons/icons/icon.icns',
          extraResources: {
            from: "./extra/darwin/",
            to: "./download",
            filter: [
              "**/*"
            ]
          }
        },
        win: {
          icon: 'icons/icons/icon.ico',
          target: [{
            target: "nsis",
            arch: [
              "x64",
              "ia32"
            ]
          }],
          artifactName: "${name}-Setup.${ext}",
          extraResources: {
            from: "./extra/win32/",
            to: "./download",
            filter: [
              "**/*"
            ]
          }
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          menuCategory: "Mius",
          installerLanguages: ["en_US", "zh_CN"],
          multiLanguageInstaller: true
        },
        linux: {
          icon: 'icons',
          target: [{
            target: "AppImage",
            arch: [
              "x64",
              "ia32"
            ]
          }],
          maintainer: 'Millux',
          category: 'Game',
          executableName: 'Mius',
          artifactName: '${name}-${arch}.${ext}',
          extraResources: {
            from: "./extra/linux/",
            to: "./download",
            filter: [
              "**/*"
            ]
          }
        }
      },
      mainProcessFile: 'src/app.js',
      mainProcessWatch: ['src'],
    },
    quasar: {
      treeShake: true
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}