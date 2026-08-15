Ext.define('AdministratorSearch.view.NotificacionesControlesView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.notificacionescontrolesview'],
    preventHeader: true,
    width: 600,
    height: 400,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 300,
        enforceMaxLength: true
    },
    items: [
        {

            xtype: 'checkbox',
            fieldLabel: 'Enviar notificación push al finalizar una orden de servicio técnico',
            itemId: 'chkbPlantillaPush',
        }, {
            xtype: 'combo',
            fieldLabel: 'Plantilla Push',
            itemId: 'platillaPushCombo',
            anchor: '100%',
            queryMode: 'local',
            displayField: 'pls_cdescripcion',
            valueField: 'Id',
        }, {

            xtype: 'checkbox',
            fieldLabel: 'Enviar encuesta al finalizar una orden de servicio técnico',
            itemId: 'chkbEncuesta',
        }, {
            xtype: 'combo',
            fieldLabel: 'Selección encuesta',
            anchor: '100%',
            itemId: 'encuestaCombo',
            //anchor : '50%',
            queryMode: 'local',
            displayField: 'enc_name',
            valueField: 'Id',

        }
    ],
    initComponent: function () {
        this.callParent();
    } // cierro init
});