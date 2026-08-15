Ext.define('AdministratorSearch.view.parametro_LANDINGACTIVATIONCODEview', {
    extend : 'Ext.form.Panel',
    alias : 'widget.parametro_LANDINGACTIVATIONCODEview',
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    
    items:[{
        xtype: 'textfield',
        itemId: 'textfield',
        fieldLabel: 'Código de activación',
        labelWidth :  80,
        maxLength:8,
        minLength:8,
        maskRe: /[A-Za-z0-9]/,
        regex: /[A-Za-z0-9]/,
        regexText: getLocale('Debe ingresar números y/o letras'),
        listeners : {
            change : function (textareafield, value, e, eOpts) {
                var view = textareafield.up('parametro_LANDINGACTIVATIONCODEview');
                view.calculateValues();
            }                
        },
    },{
        xtype: 'textfield',
        itemId: 'par_ivalor',
        name: 'par_ivalor',
        hidden : true
    },{
        xtype: 'textarea',
        name: 'par_cvalor',
        fieldLabel:'Valor',
        anchor:'100%',
        itemId:'jsonvalues',
        alowBlank: false,
        hidden:true
    }],
    
    calculateValues : function () {
        var controller = this;
        var textfield = this.down('#textfield').getValue();
        
        textfield == '' ? controller.down('#par_ivalor').setValue(0) : controller.down('#par_ivalor').setValue(1) ;
        controller.down('#jsonvalues').setValue(textfield);
    },
    
    loadRecord : function(record) {
        this.callParent(arguments);
        var par_cvalor = record.get('par_cvalor');
        
        try {
            this.down('#textfield').setValue(par_cvalor);
        } catch (e) {

        }
    },
        
    initComponent : function() {
    	this.callParent();            
    }

});