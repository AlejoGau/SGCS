//MIGRADO2024
Ext.define('Common.view.PerfilField', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.perfilfield',
    title : 'Seleccione un perfil',
    ignoreDirty: true,
    autoHeight : true,
    padding: 5,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    width:'100%',
    getValue: function () {
        console.log(this)
        return this.down('#codevento').getValue()
    },
    setValue: function (values) {
        console.log(this)
        var view = this;
        if(values == 0) {
            return false;
        }
        
        var codigos = String(values).split(',')
        
        if(codigos.length == 1) {
            
            var codigoalarmaStore  =Ext.create('Ext.data.Store',{
                model: 'Common.model.AdministratorSearchModel',
                pageSize: 1000,
                remoteSort: false,
                filters: [{
                    property:'udw_idKey',
                    value: codigos[0]
                }],
                remoteFilter: true,
                sorters: [
                        { 
                            property: 'udw_idKey',
                            direction:'ASC'
                        }
                    ]
            })
            codigoalarmaStore.proxy.extraParams = {perfil:true};
            codigoalarmaStore.load({callback:function (records) {
                if(records.length > 0) {
                    
                   view.down('#deleteEvent').show()                    
                   view.down('#nombreevento').setValue(records[0].get('udw_usuario'))
                   this.fireEvent('change', this,values)
                }
            }})
            
            
            
        } else if(codigos.length > 1) {
            view.down('#nombreevento').setValue(codigos.join(','))
            view.down('#deleteEvent').show()
            view.down('#verperfil').show()
            
        } else {
            view.down('#deleteEvent').hide()
            view.down('#verperfil').hide()
        }
        
        this.down('#codevento').setValue(codigos.join(','))
        this.fireEvent('change', this,values)
        
        
    },
    items : [
       {
            xtype:'button',
            itemId: 'evento',
            text:'Seleccione un perfil',
            margin:'0 10 0 0'
        },{
            xtype:'button',
            itemId:'deleteEvent',
            text:'Sacar perfil',
            iconCls: 'icon-cancel',
            margin:'0 5 0 0',
            hidden:true
        },{
            xtype:'displayfield',
            itemId:'nombreevento'
        },{
            xtype:'displayfield',
            itemId:'codevento',
            hidden:true
        },{
            xtype: 'tbfill'
        }/*,{
            xtype:'button',
            itemId:'verperfil',
            iconCls: 'icon-user-gray',
            text:'Ver perfil',
            hidden:true
        }*/
        ,{
            xtype:'button',
            text:'Configuración extra perfil',
            itemId:'btnconfigextraperfil',
            hidden:true
        }
    ],
    
    
    
    initComponent: function () {
        this.callParent(arguments);
        
        if(this.title!= '') {
            this.setTitle(this.title)
        }
    } // cierro init
});