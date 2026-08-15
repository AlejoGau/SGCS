Ext.define('SgAppAccessControl.view.AC_m_AccesosProveedoresDocumentosView', {
    
    extend: 'Ext.form.Panel',
    alias: ['widget.ac_m_accesosproveedoresdocumentosview'],
    title: '',
    
	scrollable : true,
	fieldDefaults: {
		labelAlign: 'left',
		labelWidth: 120,
		anchor: '100%'

	}, /*doc */
    items:[
        {

            xtype:'combobox',
            fieldLabel: 'Documento',
            displayField : 'atd_cDescripcion',
            name: 'apd_idKeyTipoDoc',
            queryMode: 'local',
            valueField : 'Id',
            anchor: '50%',
            allowBlank: false,
            itemId: 'tipoDoc',            
        },{
            xtype:'textfield',
            name: 'apd_cDescripcion',
            fieldLabel:'Descripcion',
            itemId: 'apd_cDescripcion',
            allowBlank: false,
            anchor: '50%'
        },{
            xtype: 'datefield',
            name: 'apd_tFechaVto',
            itemId: 'apd_tFechaVto',
            format:'d/m/Y',
            hidden: true,
            //allowBlank: false,
            anchor: '50%',
            fieldLabel: 'Fecha de Vencimiento'

        },{
            xtype: 'displayfield',
            itemId: 'apd_cPathFile',
            anchor: '100%'            
            
        },{
//-------------------------------------------------
                xtype: 'button',
                text: 'Subir un archivo',	
                itemId: 'uploaddoc',
                hidden: true,
                anchor: '30%',
                style: {
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '100%'
                },				
//-----------------------------------
     //test git
        },{
            xtype:'gridpanel',
            height: 300,
            itemId: 'gridDocumentos',
                columns: [
                    {
                        xtype: 'actioncolumn',
                        header: 'Archivo',
                        width: 50,
                        renderer: function(value, metadata,record){
                            if(record.get('apd_cPathFile'))
                                return '<a target="_blank" href="'+record.get('apd_cPathFile')+'"><img src="/resources/global/images/icons/book_link.png"> </img> </a>';
                        }
                    }
                    /*{
                        xtype:'templatecolumn', 
                        header: 'Archivo',
                        tpl: '<a href="{apd_cPathFile}">{apd_cPathFile}</a>',                      
                        tpl: '<img src="/gallery/' + record.get('apr_cPathPicture') + '" width="16" heigth="16" class="img-thumbnail" style="float:right" >',
                        width:50,
                        
                        tooltip: 'Descargar',
                    }*/,



            //-------------------------------		

                    {
                        xtype: 'gridcolumn',
                        header: 'Descripción',
                        dataIndex: 'apd_cDescripcion',
                        flex: 1
                    }, {
                        xtype: 'gridcolumn',
                        header: 'Archivo',
                        hidden: true,
                        itemId: 'apd_cPathFile',
                        flex: 1

                    }, {                        
                        xtype: 'datecolumn',
                        header: 'Fecha Vto.',
                        format:'d/m/Y',
                        dataIndex: 'apd_tFechaVto',
                        renderer: function(value, metadata,record){
                            console.log(value);
                            if(record.get('apd_tFechaVto').getYear()<0)
                                return '';
                            else{
                                
                                var dd = String(value.getDate()).padStart(2, '0');
                                var mm = String(value.getMonth() + 1).padStart(2, '0'); //January is 0!
                                var yyyy = value.getFullYear();

                                var date = dd + '/' + mm + '/' + yyyy;
                                return date;
                            }
                        },
                        flex: 1
                    }    

                ],
        }
    ],            
    initComponent: function () {
        var comboSearch = [
            ['fir_ccuenta', getLocale('Cuenta')],
            ['fir_cnombre', getLocale('Nombre')]
        ];

        this.callParent(arguments);
        var grid = this.down('#gridDocumentos');        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        grid.addDocked(pagingtoolbar);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                iconCls: 'icon-add',
                text: 'Agregar',
                action: 'add'
            }, {
                iconCls: 'icon-delete',
                text: 'Eliminar',
                disabled: true,
                action: 'delete',
                itemId: 'delete'
            }            
            ] // cierro items
        });
        grid.onSelectChange = function (selModel, selections) {
            grid.down('button[action=delete]').setDisabled(selections.length === 0);
        };

        grid.getSelectionModel().on('selectionchange', grid.onSelectChange, grid);
        
        grid.addDocked(toolbar);
        if(this.hideAddEdit){
            toolbar.hide();
            this.down('#tipoDoc').hide();
            this.down('#apd_cDescripcion').hide();
            this.down('#apd_tFechaVto').hide();
            this.down('#apd_cPathFile').hide();
            this.down('#uploaddoc').hide();
        }

    }
});