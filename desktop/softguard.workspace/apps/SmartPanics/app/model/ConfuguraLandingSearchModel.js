Ext.define('SmartPanics.model.ConfuguraLandingSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'nombreForm',
    fields: [{
        name: 'principalServer', //OK
        type: 'string'
    },
    { name: 'lcfg_iid_json', type: 'string' }, //OK
    { name: 'mostrarPais', type: 'string' },
    { name: 'mostrarProvincia', type: 'string' },
    { name: 'step2LabelProvincia', type: 'string' },
    { name: 'mostrarFecNac', type: 'string' },
    { name: 'nombreForm', type: 'string' },//OK
    { name: 'Dealer', type: 'string' }, //OK
    { name: 'nombreCampoDealer', type: 'string' }, //OK
    { name: 'solicitarCodigoActivacion', type: 'string' }, //OK
    { name: 'codigoActivacion', type: 'string' }, //OK
    { name: 'groupMax', type: 'int' }, //OK
    { name: 'MailTo', type: 'string' }, //OK
    { name: 'MailSubject', type: 'string' }, //OK
    { name: 'MailBodyNO', type: 'string' }, //OK
    { name: 'MailSubjectCustomer', type: 'string' }, //OK
    { name: 'MailBodyCustomer', type: 'string' }, //OK
    { name: 'reCaptcha', type: 'string' }, //OK
    { name: 'condiciones', type: 'string' }, //OK
    { name: 'plantillaSP', type: 'string' },//OK
    { name: 'automonitoreo', type: 'string' },//OK
    { name: 'apptype', type: 'string' },//OK
    { name: 'diasPruebaCampo', type: 'string' },//OK
    { name: 'diasprueba', type: 'int' }, //OK
    { name: 'cuentatipo', type: 'string' },//OK
    { name: 'enviarEmail', type: 'string' },//OK
    { name: 'emailContactoAyuda', type: 'string' },
    { name: 'imei', type: 'string' },
    { name: 'mostrarMensaje', type: 'string' },
    { name: 'ocultarPregunta', type: 'string' },
    { name: 'mailSubjectActiveAccount', type: 'string' },
    { name: 'mailBodyActiveAccount', type: 'string' },
    { name: 'emailsTemplates', type: 'string' },
    { name: 'nombreApp', type: 'string' },
    { name: 'autoActivarSP', type: 'string' },
    { name: 'esLandingAcotada', type: 'string' },
    { name: 'demo', type: 'string' },
    { name: 'activarPago', type: 'string' },
    { name: 'DealerFreemium', type: 'string' },
    { name: 'activarFreemium', type: 'string' },
    { name: 'textoInvitaPagar', type: 'string' },
    { name: 'tituloRegistroFreemium', type: 'string' },
    { name: 'textoRegistroFreemium', type: 'string' },
    { name: 'textoBotonFreemium', type: 'string' },
    { name: 'errorFreemium', type: 'string' },
    { name: 'errorActivacion', type: 'string' },
    { name: 'Public_Key', type: 'string' },
    { name: 'Access_Token', type: 'string' },
    { name: 'preapproval_plan_id_mensual', type: 'string' },
    { name: 'preapproval_plan_id_anual', type: 'string' },
    { name: 'clientId', type: 'string' },
    { name: '_clientId', type: 'string' },
    { name: 'clientSecret', type: 'string' },
    { name: 'plan_id_mensual_paypal', type: 'string' },
    { name: 'plan_id_anual_paypal', type: 'string' },
    { name: 'textoConfiramaPagoFreemium', type: 'string' },
    { name: 'textoConfiramaPagoComun', type: 'string' },
    { name: 'btnVolver', type: 'string' },
    { name: 'lblFaltaImei', type: 'string' },
    { name: 'textoInicio', type: 'string' },
    { name: 'lblTituloForm', type: 'string' },
    { name: 'imeiValidated', type: 'string' },
    { name: 'pagoPendienteTitulo', type: 'string' },
    { name: 'pagoPendienteSubTitulo', type: 'string' },
    { name: 'pagoPendienteBajadaLinea', type: 'string' },
    { name: 'pagoPendienteTextoBoton', type: 'string' },
    { name: 'btnCancelarPago', type: 'string' },
    { name: 'errorValidatePending', type: 'string' },
    { name: 'lblTextoCodPromocional', type: 'string' },
    { name: 'planTitulo', type: 'string' },
    { name: 'theme', type: 'string' },
    { name: 'step1Placeholder', type: 'string' },
    { name: 'step1ShowErrorCodigoTexto1', type: 'string' },
    { name: 'step1ShowErrorCodigoTexto2', type: 'string' },
    { name: 'txtBtnSiguiente', type: 'string' },
    { name: 'txtBtnAnterior', type: 'string' },
    { name: 'step2BtnYaTengoCta', type: 'string' },
    { name: 'step2BtnSoyUsuario', type: 'string' },
    { name: 'step2TituloDatosPersonales', type: 'string' },
    { name: 'step2PlaceHolderNombre', type: 'string' },
    { name: 'step2ShowErrorNombre', type: 'string' },
    { name: 'step2PlaceHolderDireccion', type: 'string' },
    { name: 'step2ShowErrorDireccion', type: 'string' },
    { name: 'step3Titulo', type: 'string' },
    { name: 'step3PlaceHolderEmail', type: 'string' },
    { name: 'step3ShowErrorEmail', type: 'string' },
    { name: 'step3ShowLabelErrorFormatMail', type: 'string' },
    { name: 'step3ShowLabelErrorExisteMail', type: 'string' },
    { name: 'step3PlaceHolderConfirmaMail', type: 'string' },
    { name: 'step3ShowLabelErrorConfirmaMail', type: 'string' },
    { name: 'step3showLabelErrorFormatConfirmaMail', type: 'string' },
    { name: 'step3ShowLabelErrorCompareMail', type: 'string' },
    { name: 'step3PlaceHolderTel', type: 'string' },
    { name: 'step3PlaceHolderConfirmaTel', type: 'string' },
    { name: 'step3showLabelErrorTel', type: 'string' },
    { name: 'step3showLabelErrorLongTel', type: 'string' },
    { name: 'step3showLabelErrorExisteTel', type: 'string' },
    { name: 'step3showLabelErrorConfirmaTel', type: 'string' },
    { name: 'step3showLabelErrorConfirmaLongTel', type: 'string' },
    { name: 'step3showLabelErrorCompareTel', type: 'string' },
    { name: 'step4TituloVerificarDatos', type: 'string' },
    { name: 'step4LabelNombre', type: 'string' },
    { name: 'step4LabelDireccion', type: 'string' },
    { name: 'step4LabelPais', type: 'string' },
    { name: 'step4LabelTelefono', type: 'string' },
    { name: 'step4LabelMail', type: 'string' },
    { name: 'step4btnVolver', type: 'string' },
    { name: 'step4btnEnviar', type: 'string' },
    { name: 'mensajeVerificaionExitosa', type: 'string' },
    { name: 'step1MayorDeEdad', type: 'string' },
    { name: 'step2Localidad', type: 'string' },
    { name: 'step4FecNac', type: 'string' },
    { name: 'step4Provincia', type: 'string' },
    { name: 'steepOtrosActivar', type: 'string' },
    { name: 'step1CuentaYTelefono', type: 'string' },
    { name: 'step1CuentaYClave', type: 'string' },
    { name: 'step1NroCta', type: 'string' },
    { name: 'step1DatosErroneos', type: 'string' },
    { name: 'step1IngreseClave', type: 'string' },
    { name: 'violenciagenero', type: 'string' },
    { name: 'dealerViolenciagenero', type: 'string' },
    { name: 'campoDiscapacidad', type: 'string' },
    { name: 'step2ViolenciaGenero', type: 'string' },
    { name: 'step2Discapacidad', type: 'string' },
    // WhatsApp API config
    { name: 'keycontrol', type: 'string' },
    { name: 'beaerToken', type: 'string' },
    { name: 'msjvalidacion', type: 'string' },
    // WhatsApp validation fields
    { name: 'validarTelefonoWhatsapp', type: 'string' },
    { name: 'whatsappTituloModal', type: 'string' },
    { name: 'whatsappSubtituloModal', type: 'string' },
    { name: 'whatsappPlaceholderCodigo', type: 'string' },
    { name: 'whatsappBtnEnviarCodigo', type: 'string' },
    { name: 'whatsappBtnValidar', type: 'string' },
    { name: 'whatsappBtnReenviar', type: 'string' },
    { name: 'whatsappErrorCodigoVacio', type: 'string' },
    { name: 'whatsappErrorCodigoInvalido', type: 'string' },
    { name: 'whatsappMensajeEnviado', type: 'string' },
    { name: 'whatsappMensajeReenviado', type: 'string' },
    { name: 'whatsappEnviandoCodigo', type: 'string' },
    { name: 'whatsappValidando', type: 'string' },
    { name: 'whatsappCodigoValidado', type: 'string' },
    { name: 'whatsappErrorEnvio', type: 'string' },
    { name: 'whatsappValidezCodigo', type: 'string' },
    { name: 'whatsappMensajeInicial', type: 'string' },
    { name: 'labelCustom', type: 'string' },
    { name: 'step2PlaceholderCustom', type: 'string' },
    { name: 'mostrarDNI', type: 'string' },
    { name: 'tiposDNI', type: 'string' },
    { name: 'defaultOptionPais', type: 'string' },
    { name: 'defaultOptionProvincia', type: 'string' },
    { name: 'autocompletarDireccion', type: 'string' },
    { name: 'paisAutocompletarDireccion', type: 'string' }
    ],
    idProperty: 'nombreForm',
    proxy: {
        type: 'rest',

        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/rest/search/SearchLandingConfig',
        appendId: false
    }
});