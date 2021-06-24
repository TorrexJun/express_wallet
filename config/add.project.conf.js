const path = require('path')
const fs = require('fs')
const os = require('os')
const inquirer = require('inquirer')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: '请输入要新增项目的名字',
    validate: function (name) {
      const done = this.async()
      if (!name) {
        done('项目名不能为空')
        return
      }
      fs.readdir(path.resolve(__dirname, '../src'), 'utf8', (err, data = []) => {
        const jsFiles = data.filter(e => e.indexOf('.main.js') !== -1)
        for (const i of jsFiles) {
          if (i.split('.main.js')[0] === name) {
            done('项目名字已重复, 请重新输入')
            return
          }
        }
        const fileName = name
        // main.js
        const mainFileData = fs.readFileSync(path.join(__dirname, '/main.js'), 'utf8')
        const newMainData = mainFileData.replace(/XXX/, `views-${fileName}`)
        fs.writeFileSync(path.join(__dirname, `../src/${fileName}.main.js`), newMainData, 'utf8')
        // views目录
        const dirName = `views-${fileName}`
        const dirSrc = path.join(__dirname, `../src/${dirName}`)
        if (fs.existsSync(dirSrc)) {
          if (!fs.statSync(dirSrc).isDirectory()) {
            fs.unlinkSync(dirSrc)
          }
        } else {
          fs.mkdirSync(dirSrc)
        }
        // public/html
        const htmlPath = path.join(__dirname, `../public/${fileName}.html`)
        let htmlFile = fs.readFileSync(path.join(__dirname, '/index.html'), 'utf8')
        htmlFile = htmlFile.replace(/XXX/, fileName)
        fs.writeFileSync(htmlPath, htmlFile, 'utf8')
        // App.vue
        const appFileData = fs.readFileSync(path.join(__dirname, 'App.vue'), 'utf8')
        fs.writeFileSync(path.join(__dirname, `../src/${dirName}/App.vue`), appFileData, 'utf8')
        // api
        let apiFile = fs.readFileSync(path.join(__dirname, './api.js'), 'utf8')
        apiFile = apiFile.replace(/api/, `${fileName}-api`)
        fs.writeFileSync(path.join(__dirname, `../src/api/${fileName}.js`), apiFile, 'utf8')
        let apiIndexFile = fs.readFileSync(path.join(__dirname, '../src/api/index.js'), 'utf8')
        let insert = `import ${fileName} from './${fileName}'${os.EOL}export default {${os.EOL}  ${fileName},`
        apiIndexFile = apiIndexFile.replace(/export default {/, insert)
        fs.writeFileSync(path.join(__dirname, '../src/api/index.js'), apiIndexFile, 'utf8')
        // page.index.json
        const pagesPath = path.join(__dirname, './page.index.json')
        const pagesFile = fs.readFileSync(pagesPath, 'utf8')
        let vueConfigData = JSON.parse(pagesFile)
        vueConfigData[fileName] = {
          entry: `src/${fileName}.main.js`,
          template: `public/${fileName}.html`
        }
        fs.writeFile(pagesPath, JSON.stringify(vueConfigData), 'utf8', () => {
          console.log('\n创建完成')
          done(null, true)
        })
      })
    }
  }
])
