// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': (browser) => {
    const nombre = 'Nico'
    const categoria = 'Otros'
    const descripcion = 'Prueba_E2E'
    const fechaEntrada = '22/10/2009'
    const monto = '47'
    const montoTrans = '32'
    browser
        .url('http://localhost:8080')
        .pause(3000)
        .click('#CrearCuenta')
        .waitForElementVisible('#Cuenta', 3000)
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
        .waitForElementVisible('#TablaIngresos' + nombre + ' #' + descripcion, 3000)
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
