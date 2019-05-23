// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': (browser) => {
    var nombre = 'Nico'
    var categoria = 'Otros'
    var descripcion = 'Prueba_E2E'
    var fechaEntrada = '22/10/2009'
    var fechaSalida = '2009/10/22'
    var monto = '47'
    var montoTrans = '32'
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
        //.pause(3000)
        .waitForElementVisible('#Cuenta', 3000)
        //.assert.elementPresent('#Cuenta')
        .click('#Cuenta .input')
        .pause(3000)
        .clearValue('#Cuenta .input')
        .setValue('#Cuenta .input', nombre)
        .click('#Cuenta #btnEditar')
        .pause(3000)
        .assert.elementPresent('#' + nombre)
        .assert.elementPresent('#' + nombre + ' .input')
        .assert.elementPresent('#' + nombre + ' #btnEditar')
        .assert.elementPresent('#' + nombre + ' #btnEliminar')
        .assert.elementPresent('#NuevoItem')
        .assert.elementPresent('#ListaVacia')
        .click('#NuevoItem')
        .waitForElementVisible('#popup' + nombre, 3000)
        .clearValue('#popup' + nombre + ' #Categoria')
        .click('#popup' + nombre + ' #Categoria')
        .keys('Otros')
        .keys(browser.Keys.ENTER)
        .pause(1000)
        .clearValue('#popup' + nombre + ' #Descripcion')
        .setValue('#popup' + nombre + ' #Descripcion', descripcion)
        .pause(1000)
        .clearValue('#popup' + nombre + ' #Monto')
        .setValue('#popup' + nombre + ' #Monto', monto)
        .pause(1000)
        .clearValue('#popup' + nombre + ' #Fecha')
        .setValue('#popup' + nombre + ' #Fecha', fechaEntrada)
        .pause(1000)
        .click('#popup' + nombre + ' #Salvar')
        .waitForElementVisible('#TablaIngresos' + nombre, 3000)
        .waitForElementVisible('#TablaIngresos' + nombre + ' #' + categoria, 3000)
        //.assert.elementPresent('#Tabla' + nombre + ' #' + categoria)
        .waitForElementVisible('#TablaIngresos' + nombre + ' #' + descripcion, 3000)
        //.assert.elementPresent('#Tabla' + nombre + ' #' + descripcion)
        //.waitForElementVisible('#Tabla' + nombre + ' #' + parseFloat(monto), 3000)
        //.assert.elementPresent('#Tabla' + nombre + ' #' + monto)
        //.waitForElementVisible('#Tabla' + nombre + ' #' + fechaSalida, 3000)
        //.assert.elementPresent('#Tabla' + nombre + ' #' + fechaSalida)
        .click('#Transferir')
        .waitForElementVisible('#popupTransferir', 3000)
        .clearValue('#popupTransferir #Cuenta')
        .setValue('#popupTransferir #Cuenta', 'Mateo')
        .keys(browser.Keys.ENTER)
        .pause(1000)
        .clearValue('#popupTransferir #Monto')
        .setValue('#popupTransferir #Monto', montoTrans)
        .click('#popupTransferir #Transferir')
        .pause(1000)
        .click('#irAEgresos')
      console.log('viendo egresos')
      browser
        .waitForElementVisible('#TablaEgresos' + nombre, 3000)
        .assert.elementPresent('#TablaEgresos' + nombre + ' #Transferencia_Mateo')
        .assert.elementPresent('#TablaEgresos' + nombre + ' #Transferencia')
        .end()
  }
}
