module.exports = {
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
          icon: 'icons/icons/icon.icns'
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
          artifactName: "${name}-Setup.${ext}"
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
          artifactName: '${name}-${arch}.${ext}'
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