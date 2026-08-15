Ext.define('AdministratorSearch.view.parametro_TELEPORTECONFIGview', {
    extend : 'Ext.form.Panel',
    alias : ['widget.parametro_TELEPORTECONFIGview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
        {
            xtype:'fieldset',
            title: getLocale('Credenciales de Acceso'),
            margin:'0 0 5 0',
            items:[
                    {
                        xtype:'textfield',
                        itemId:'TwsHost',
                        name:'TwsHost',
                        fieldLabel: 'URL',
                        vtype: 'url',
                        width: 350
                    },{
                        xtype:'textfield',
                        allowBlank: false,
                        itemId:'TwsApiOrgToken',
                        name:'TwsApiOrgToken',
                        fieldLabel: 'Api Token',
                        width: 350
                    },{
                        xtype:'textfield',
                        inputType: 'email',
                        itemId:'TwsUser',
                        name:'TwsUser',
                        fieldLabel: 'Usuario',
                        width: 350
                    },{
                        xtype:'textfield',
                        inputType: 'password',
                        itemId:'TwsPass',
                        name:'TwsPass',
                        fieldLabel: 'Clave',
                        allowBlank: false,
                        width: 350
                    }
                ]
        },{
            xtype: 'textarea',
            name: 'par_cvalor',
            fieldLabel:'Valor',
            anchor:'100%',
            //id: 'plantillatrackguard',
            itemId:'jsonvalues',
            alowBlank: false,
            hidden:true
        }
    ],
    
    saveValues: function(){
        var json = '';
        
        var values = {};
        
        values.TwsHost = this.down('#TwsHost').getValue();
        values.TwsApiOrgToken = this.down('#TwsApiOrgToken').getValue();
        values.TwsUser = this.down('#TwsUser').getValue();
        values.TwsPass = this.down('#TwsPass').getValue();
        
        this.down('#jsonvalues').setValue(Ext.JSON.encode(values));
    },


    loadRecord : function(record) {
    	this.callParent(arguments);
        
        var par_cvalor = record.get('par_cvalor');
        
        if (par_cvalor && par_cvalor!=''){
            var values = Ext.JSON.decode(par_cvalor);
            console.log(values)
            this.down('#TwsHost').setValue(values.TwsHost);
            this.down('#TwsApiOrgToken').setValue(values.TwsApiOrgToken);
            this.down('#TwsUser').setValue(values.TwsUser);
            this.down('#TwsPass').setValue(values.TwsPass);
        }
 
	},


    initComponent : function() {
		this.callParent();
        this.down('#TwsHost').on('change',this.saveValues,this);
        this.down('#TwsApiOrgToken').on('change',this.saveValues,this);
        this.down('#TwsUser').on('change',this.saveValues,this);
        this.down('#TwsPass').on('change',this.saveValues,this);
	}
});