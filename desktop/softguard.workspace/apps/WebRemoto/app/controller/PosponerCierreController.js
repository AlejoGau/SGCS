Ext.define('WebRemoto.controller.PosponerCierreController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TablaDiasStore' ],
    models : [ 'HorarioModel', 'HorarioAlternativoModel', 'TimeZoneModel', 'EventosTiemLineModel', 'HorarioSearchModel', 'HorariosAlternativosSearchModel' ],
    views : [ 'PosponerCierreView' ],


    init: function (config) {
        var me = this;
        // genero los eventos

        this.control({
            'posponercierreview': {
                
                afterrender: this.initView
            },
            'posponercierreview  #minutos': {
                change: this.onMinutosChange
            },
            'posponercierreview  #save': {
                click: this.onSaveClick
            }
        });

    }, // cierro init
    
    
    onSaveClick: function (btn) {
        var view = btn.up('posponercierreview');
        
        var now = view.dateCierre?view.dateCierre:Date();
        var controller =this;
        
        if (view.horaCierre){
            var arrHora = view.horaCierre.split(":")
            now.setHours(arrHora[0])
            now.setMinutes(arrHora[1])
        }
        
        
        // como apertura uso el dia del cierre que estoy grabando
        // uso la hora 00:00
        // hablado con mauro 26/09/2017 por ajustes ROMERO
        
        var pospuestaDia = parseInt(Ext.Date.format(Ext.Date.add(now, Ext.Date.MINUTE, view.down('#minutos').getValue()), 'w'))+1;
        
        /*if(pospuestaDia >= 8) {
            pospuestaDia = 1
        }*/
        
        Ext.Ajax.request({
          url: '/rest/search/posponercierre',
          method: 'GET',
          params: {
                dia: (parseInt(Ext.Date.format(now, 'w'))+1),
                pospuestaHora: Ext.Date.format(Ext.Date.add(now, Ext.Date.MINUTE, view.down('#minutos').getValue()), 'H:i'),
                pospuestaDia: pospuestaDia,
                aperturaHora: '00:00' ,
                aperturaDia: pospuestaDia,
                cue_iid: view.record.get('cue_iid'),
                idKey : view.alt_idKey,
                fechaFull: view.down('#fecha').getValue()
          },
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito');
            
            controller.getEventosTiemLineModelModel().create({
                etl_icuenta: view.record.get('cue_iid'),
                etl_tfechahora: new Date(),
                etl_caccion: 'Posponer cierre',
                etl_cobservacion: getLocale("Posponer cierre") + ' '+ Ext.Date.format(Ext.Date.add(now, Ext.Date.MINUTE, view.down('#minutos').getValue()), 'H:i'),
                etl_cowner: '%MWR%',
                etl_ioperador: view.caller.up('viewport').operadorId,
                etl_irecid: view.record.get('rec_iid')
            }).save();
            
            
            controller.loadData(view);
            view.up('window').close();
            view.caller.close();
          }
        });
    }, 
    
    onMinutosChange: function (field, value) {
        
        if (field.isValid()){
            var view = field.up('posponercierreview')      
            var now = view.dateCierre?view.dateCierre:Date();
            
            if (view.horaCierre){
                var arrHora = view.horaCierre.split(":")
                now.setHours(arrHora[0])
                now.setMinutes(arrHora[1])
            }
            
            view.down('#fecha').setValue(Ext.Date.format(Ext.Date.add(now, Ext.Date.MINUTE, value), 'Y-m-d  H:i:s'))
            
            if(value) {
                view.down('#save').setDisabled(false)
            }
        } else{
            field.setValue(1);
        }
 
    },

	initView: function(view){
        var record = view.record;
        var now = new Date();
        var controller = this;
        this.loadData(view)
        
        if(getParametro('AJUSTAHORARIO') && record.get('cue_iZonaHoraria') != 0) {
            this.getTimeZoneModelModel().load(record.get('cue_iZonaHoraria'), {callback:function (recordTimeZone) {
                var container = {
                    xtype:'container',
                    html: '<div style="display: flex; align-items: center;"><img src="/resources/global/images/icons/error.png" />'+getLocale('Zona horaria configurada:')+' '+recordTimeZone.get('ttz_cTitle')+'<img src="/resources/global/images/icons/error.png" /></div>'
                }
                view.down('#timezone').add(container)
                view.down('#timezone2').add(container)
            }})
        }
       
    },
    
    loadData: function (view) {
        var now = new Date();
        var controller = this;
        var record = view.record;
        
      /*  var dia = parseInt(Ext.Date.format(now, 'N'))+1;
        var dia2;
        
        if (dia == 7){
            dia2=1;
        }
        
        if (dia == 8){
            dia = 1;
            dia2 = 2;
        }*/
        
        var mystoreHorario =Ext.create('Ext.data.Store',{
            model: controller.getHorarioSearchModelModel(),
            remoteFilter:true,
            filters:[
                  /*  {
                        property:'hor_choracierre:GT',
                        value:Ext.Date.format(now, 'H:i')
                    },*//*{ -- muestro todos los horarios a pedido de leo 28/8/2017
                        property:'hor_ndiacierre:ININT',
                        value:dia//+','+dia2 //si se queiren 2 dias habilitar el dia2
                    },*/{
                        property:'hor_iidcuenta',
                        value:view.record.get('cue_iid')
                    }
                ]
        });
        
     
        view.down('#gridHorarios').bindStore(mystoreHorario);
        // una vez que cargue el store hago el binding con la view
        mystoreHorario.load({callback:function(recordHorarioStandar) {
            
            var mystore =Ext.create('Ext.data.Store',{
                model: controller.getHorariosAlternativosSearchModelModel(),
                remoteFilter:true,
                
                remoteSort: true,
                filters:[
                        {
                            property:'alt_choracierre:GTTIME',
                            value:Ext.Date.format(now, 'H:i')
                        },{
                            property:'alt_ndiacierre',
                            value:(parseInt(Ext.Date.format(now, 'w'))+1) //(parseInt(Ext.Date.format(now, 'N'))+1)
                        },{
                            property:'alt_iidcuenta',
                            value:view.record.get('cue_iid')
                        }
                    ],
                    sorters: [
                        {
                            property:'alt_choracierre',
                            direction:'DESC'
                        }
                    ]
            });
            
         
            view.down('#grid').bindStore(mystore);
            // una vez que cargue el store hago el binding con la view
            mystore.load({callback: function (records,operation,success) {
                
                // el horario alternativo se siempre desde NOW en adelante
                // hablado con MAURO 26/09/2017 por feedback de ROMERO
                // se mantiene la apertura mas cercana
                view.dateCierre = new Date();
                view.down('#setminutes').setDisabled(false)
                view.down('#save').setDisabled(false)
                
            if (success){

                if(records.length > 0) {

                    view.horaApertura = records[0].get('alt_choraapertura')
                    view.diaApertura = records[0].get('alt_ndiaapertura')
                    //view.horaCierre =  records[0].get('alt_choracierre')
                    view.alt_idKey = records[0].get('alt_idKey')
                    view.down('#setminutes').setDisabled(false)
                    console.log("encontro horario alternativo");
                    console.log(records[0]);
                } else {
                   // mystoreHorario.load({callback: function (records,operation,success) {
                    if(recordHorarioStandar.length > 0) {
                        var rec = null;
                        var distancia = null;
                        Ext.Array.each(recordHorarioStandar, function (record) {
                            
                            var horacierre = new Date(); 
                            var now = new Date(); 
                            var arrHora = record.get('hor_choracierre').split(":")
                            
                            horacierre.setHours(arrHora[0])
                            horacierre.setMinutes(arrHora[1])
                            var distance = record.get('hor_ndiacierre') - now.getDay()-1 ;
                            horacierre.setDate(now.getDate()+distance);
                            

                            if(horacierre < now) {
                                //rec = record
                                var caldis = now - horacierre
                                if(!distancia) {
                                    distancia = caldis
                                }
                                if(caldis <= distancia) {
                                    distancia = horacierre-now;
                                    rec = record;
                                    //view.dateCierre = horacierre;
                                }
                            }
                            
                        })
                        
                        view.horaApertura = rec.get('hor_choraapertura');
                        view.diaApertura = rec.get('hor_ndiaapertura');
                        //view.horaCierre =  rec.get('hor_choracierre');
                        
                        console.log("Seteo proximo cierre");
                        console.log(view.horaCierre);
                    
                        view.down('#setminutes').setDisabled(false)
                        view.down('#save').setDisabled(false)
                    } else {
                        notify('No hay horarios de cierre');
                    }
                    }
                }
                
            }});
        }})
    }
});