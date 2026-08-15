//MIGRADO2024
Ext.define('Common.view.SmsModemCombo', {
    extend : 'Ext.form.field.ComboBox',
    alias : 'widget.smsmodemcombo',
    displayField : 'sms_cdescripcion',
    valueField : 'sms_icodigo',
    anchor : '100%',
    queryMode: 'local',
    fieldLabel: 'Modem',
	allowBlank : false,
    emptyText: getLocale('Seleccione'),
    initComponent: function(){
        this.callParent();
        
        // creo el store de datos
        var store = Ext.data.StoreManager.lookup('TablasModemsSmsStore');
        
        // bindeo el store
        this.bindStore(store);
    
    }
});