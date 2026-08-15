//MIGRADO2024
Ext.define('Common.view.EventoSonidoButtonView', {
    extend: 'Ext.button.Button',
    alias: 'widget.eventosonidobutton',
    enableToggle: true,
    text: 'Eventos con voz',
    lastiid: 0,
    iconCls: 'icon-bell',
    
    constructor: function(config)
    {
        var me = this;
        config = config || {};
        /*
        Ext.applyIf(config.uploader, {
            browse_button: config.id || Ext.id(me)
        });
        */
        me.callParent([config]);
    },
    
    initComponent: function()
    {
        var me = view = this,
            e;
        me.callParent();
        view.task = Ext.TaskManager.start({
            args: [view],
            scope: me,
            run: me.loadData,
            interval: 5000
        });
    },
    
    loadData : function(btn) {
        var pageSize = 1; //si es la primera vez traigo hasta 100 pendientes
        var me = this;
        var text = '';
        // si el boton no esta activo no hago nada
        if (!btn.pressed){
            return;
        }
        
        if (!btn.mystore){
            btn.mystore=Ext.create('Ext.data.Store',{
                model: this.getEventoSonidoSearchModelModel(),//this.getEventosPendientesSearchModelModel(), 
                filter: btn.filter,
                remoteFilter: true
            });
        }
        
        var generaalerta;
        if (getParametro('MMSONIDONOALERTAS') == 1){
            generaalerta=0;
        }else {
            generaalerta=1;
        }
        btn.mystore.proxy.extraParams = {soloGeneraAlerta:generaalerta};
        
        if (!btn.mute && !btn.mystore._loading)
        btn.mystore.load({callback: function(records){
            btn.mystore.each(function(item, index, count){
                var filename = item.get('cod_cSonido');
                if (!filename){
                    filename = "prioridad"+ item.get('cod_nprioridad')+'_'+locale+".mp3"
                }
                if (item.get("rec_iid") > btn.lastiid && filename!=''){
                    btn.audio = new Audio('/gallery/codalarmsound/'+filename);
                    btn.audio.loop=false;
                    btn.audio.play();
                    btn.lastiid = item.get("rec_iid");
                    btn.fireEvent('newAlarm',btn,item);
                }   
            })
        }});
	},
    
    onBeforeload: function(store,operation,options){
        var view = operation.scope; // llega vacio dedalo 19/9/2016
        var estados = "0,1,2,4,9";
        var alertas = 1;
        operation.params ={
            //Alertas: alertas,
           // cod_nLeeSonido: 1,
            Origenes: null,
            est_nestado: 0, // solo cuentas habilitadas, pedido por fer G4S 11/10/2016
            Tipos: null,
            Mostrar: 1
        };
     /*   view.searchFilters.push({
                property:'rec_nestado',
                value: 0,
                id:'rec_nestado',
                base:true
            })*/
            
        //view.EventosStore.proxy.extraParams = {completo:false};
    },
    getEventoSonidoSearchModelModel: function(){
        //return Ext.ModelMgr.getModel('Common.model.EventoSonidoSearchModel');
        return Ext.data.schema.Schema.instances.default.getEntity('Common.model.EventoSonidoSearchModel');
    }
});