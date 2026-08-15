Ext.define('AdministratorSearch.view.parametro_NOMINATIMCONFIGview', {
    extend : 'Ext.form.Panel',
    alias : ['widget.parametro_NOMINATIMCONFIGview'],
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
            title: getLocale('Keys proveedores'),
            margin:'0 0 5 0',
            items:[
                    {
                        xtype:'textfield',
                        itemId:'KeyMapquest',
                        name:'KeyMapquest',
                        fieldLabel: 'Mapquest'
                    },{
                        xtype:'textfield',
                        itemId:'KeyOpenCage',
                        name:'KeyOpenCage',
                        fieldLabel: 'OpenCage'
                    },{
                        xtype:'textfield',
                        itemId:'KeyMapZen',
                        name:'KeyMapZen',
                        fieldLabel: 'MapZen'
                    },{
                        xtype:'textfield',
                        itemId:'KeyLocationIq',
                        name:'KeyLocationIq',
                        fieldLabel: 'LocationIq'
                    },{
                        xtype:'textfield',
                        itemId:'KeyGoogle',
                        name:'KeyGoogle',
                        fieldLabel: 'Google'
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
        
        values.KeyMapquest = this.down('#KeyMapquest').getValue();
        values.KeyOpenCage = this.down('#KeyOpenCage').getValue();
        values.KeyMapZen = this.down('#KeyMapZen').getValue();
        values.KeyLocationIq = this.down('#KeyLocationIq').getValue();
        values.KeyGoogle = this.down('#KeyGoogle').getValue();
        
        this.down('#jsonvalues').setValue(Ext.JSON.encode(values));
    },


    loadRecord : function(record) {
    	this.callParent(arguments);
        
        var par_cvalor = record.get('par_cvalor');
        
        if (par_cvalor && par_cvalor!=''){
            var values = Ext.JSON.decode(par_cvalor);
            console.log(values)
            this.down('#KeyMapquest').setValue(values.KeyMapquest);
            this.down('#KeyOpenCage').setValue(values.KeyOpenCage);
            this.down('#KeyMapZen').setValue(values.KeyMapZen);
            this.down('#KeyLocationIq').setValue(values.KeyLocationIq);
            this.down('#KeyGoogle').setValue(values.KeyGoogle);
        }
 
	},


    initComponent : function() {
		this.callParent();
        this.down('#KeyMapquest').on('change',this.saveValues,this);
        this.down('#KeyOpenCage').on('change',this.saveValues,this);
        this.down('#KeyMapZen').on('change',this.saveValues,this);
        this.down('#KeyLocationIq').on('change',this.saveValues,this);
        this.down('#KeyGoogle').on('change',this.saveValues,this);
	}
});