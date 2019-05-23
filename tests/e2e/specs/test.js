// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': (browser) => {
    var nombre = 'Nico'
    browser/*
        .url(process.env.VUE_DEV_SERVER_URL)
        .waitForElementVisible('#app', 5000)
        .assert.elementPresent('.hello')
        .assert.containsText('h1', 'Welcome to Your Vue.js App')
        .assert.elementCount('img', 1)
        .end()*/
        .url('http://localhost:8080')
        .pause(3000)
        .click('#CrearCuenta')
        .pause(3000)
        .assert.elementPresent('#Cuenta')
        .click('#Cuenta .input')
        .pause(3000)
        .clearValue('#Cuenta .input')
        .setValue('#Cuenta .input', nombre)
        .pause(3000)
        .click('#Cuenta #btnEditar')
        .pause(3000)
        .assert.elementPresent('#' + nombre)
        .assert.elementPresent('#' + nombre + ' .input')
        .end()
  }
}
