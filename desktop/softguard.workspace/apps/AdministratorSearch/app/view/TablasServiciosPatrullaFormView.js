Ext.define('AdministratorSearch.view.TablasServiciosPatrullaFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasserviciospatrullaformview'],
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
    		xtype : 'textfield',
			name : 'tsp_ccodigo',
            fieldLabel: 'Codigo',
			allowBlank : false,
            maxLength: 3,
            inputWidth :40
            
		},{
			xtype : 'textfield',
			name : 'tsp_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
            anchor:'100%'
		},{
            xtype : 'colorpicker',
		//	name : 'cod_nColorLetra',
            itemId: 'colorletra',
            fieldLabel: 'Color letra',
			allowBlank : false,
            listeners: {
                
                select: function(picker, selColor) {
                    var view = this.up('tablasserviciospatrullaformview');            
                    
                    view.record.set('tsp_cpathicon','#'+selColor);
                    this.up('form').down('#icon').setValue('#'+selColor)
                }
        
            }
        },{
        	xtype : 'displayfield',
			name : '',            
            fieldLabel: 'Icono',
            itemId:'icon',
            renderer:function (value) {
                
                var record = this.up('tablasserviciospatrullaformview').record
                
                var color = '#000';                
                if(record.get('tsp_cpathicon').indexOf("#") >=0) {
                    color = record.get('tsp_cpathicon');
                }
                return '<div class="circulo" style="background-color:'+color+'"></div>'
            }
		}/*,{
    		xtype : 'textfield',
			name : 'tsp_cpathicon',
            itemId: 'pathicon',
            fieldLabel: 'Icono',
            anchor:'100%'
		},{
    		xtype:'image',
            itemId: 'imagen',
            anchor: '100%',
            hidden: true
		}*/
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});