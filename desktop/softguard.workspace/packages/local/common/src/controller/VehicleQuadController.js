//MIGRADO2024
Ext.define('Common.controller.VehicleQuadController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleSearchModel' ],
    views : [ 'VehicleQuadView' ],
	init : function(config) {
		// genero los eventos
		this.control({
			'vehiclequadview' : {
				afterrender : this.initView
			},
            'vehiclequadview #save' : {
                click : this.onSaveClick
            }
		});
	}, // cierro init
	initView : function(view) {
        view.records = [];
        var controller = this;
        view.security = {};
        
        var moduleId = this.application.getModuleIdByName('TrackGuard');
        var userName = _UserData.UserId;
        view.url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        
        view.securityLoading= true;
        Ext.Ajax.request({
          url: view.url,
          method: 'GET',
          success: function(resp,operation) {
            view.securityLoading= false;
                    
            if (resp.responseText) {
                var json = JSON.parse(resp.responseText);
            }
            
            if (json) {
                view.security = json;          
            }  
            
            controller.dibujarCuadrilla(view);
          }
        });
	},
    
    dibujarCuadrilla: function (view) {
        controller = this;
        var cuadrantes = {q11:null,q12:null,q13:null,q21:null,q22:null,q23:null};
        if (view.security && view.security.cuadrantes){
            cuadrantes = view.security.cuadrantes;
        }
        view.down('#11').add(Ext.widget('flotagpsview',{
            itemId:'11',
            hideDatapanel: true,
            margin: 3,
            border: 1,
            
            urlGeoJson: atob(cuadrantes.q11),
            cuadrante:'11'
        }));
        
        /* Daniel O. Medina https://softguard.atlassian.net/browse/DSS-629
            en el controller PoiGridController en la implementacion de evento
            onSelectionChange se hace referencia a poigridview.gmap. Para
            pasar las marcas desde los POI se debe pasar el mapa contenido
            en el FlotaGpsView.
         */
        var flotagps11 = view.down('#11').down('#11');
        flotagps11.down('#west').setWidth(180);
        
        var btnpoi11 = flotagps11.down('#poi');
        
        btnpoi11.down('poigridview').gmap = flotagps11.down('#googlemap');
        /************* */
        Ext.Function.defer(function(){
            view.down('#12').add(Ext.widget('flotagpsview',{
                itemId:'12',
                hideDatapanel: true,
                margin: 3,
                
                border: 1,
                urlGeoJson: cuadrantes.q12?atob(cuadrantes.q12):null,
                cuadrante:'12'
            }));
            /* Daniel O. Medina https://softguard.atlassian.net/browse/DSS-629
            */
            var flotagps12 = view.down('#12').down('#12');
            flotagps12.down('#west').setWidth(180);
            
            var btnpoi12 = flotagps12.down('#poi');
            
            btnpoi12.down('poigridview').gmap = flotagps12.down('#googlemap');
            
            /************* */                   
        },/*2000*/3000); //Daniel O. Medina incremento el tiempo por tarea DSS-889   
                
        Ext.Function.defer(function(){
            view.down('#13').add(Ext.widget('flotagpsview',{
                itemId:'13',
                hideDatapanel: true,
                margin: 3,
                border: 1,
                urlGeoJson: cuadrantes.q13?atob(cuadrantes.q13):null,
                cuadrante:'13'
            }));
            /* Daniel O. Medina 20/07/2023 https://softguard.atlassian.net/browse/DSS-629
            */
            var flotagps13 = view.down('#13').down('#13');
            flotagps13.down('#west').setWidth(180);
            var btnpoi13 = flotagps13.down('#poi');
            
            btnpoi13.down('poigridview').gmap = flotagps13.down('#googlemap');
            /************* */        
        }, /*2000*/3000); //Daniel O. Medina incremento el tiempo por tarea DSS-889       
          
        Ext.Function.defer(function(){
            view.down('#21').add(Ext.widget('flotagpsview',{
                itemId:'21',
                hideDatapanel: true,
                margin: 3,
                border: 1,
                urlGeoJson: cuadrantes.q21?atob(cuadrantes.q21):null,
                cuadrante:'21'
            }));
            /* Daniel O. Medina https://softguard.atlassian.net/browse/DSS-629
            */
            var flotagps21 = view.down('#21').down('#21');
            flotagps21.down('#west').setWidth(180);
            var btnpoi21 = flotagps21.down('#poi');
            
            btnpoi21.down('poigridview').gmap = flotagps21.down('#googlemap');
            /************* */                     
        }, 4000);
     
        Ext.Function.defer(function(){
            view.down('#22').add(Ext.widget('flotagpsview',{
                itemId:'22',
                hideDatapanel: true,
                margin: 3,
                border: 1,
                urlGeoJson: cuadrantes.q22?atob(cuadrantes.q22):null,
                cuadrante:'22'
            }));
            /* Daniel O. Medina https://softguard.atlassian.net/browse/DSS-629
            */
            var flotagps22 = view.down('#22').down('#22');
            flotagps22.down('#west').setWidth(180);
            var btnpoi22 = flotagps22.down('#poi');
            
            btnpoi22.down('poigridview').gmap = flotagps22.down('#googlemap');
            /************* */              
        },  /*6000*/5000);//Daniel O. Medina incremento el tiempo por tarea DSS-889
           
        Ext.Function.defer(function(){
            view.down('#23').add(Ext.widget('flotagpsview',{
                itemId:'23',
                hideDatapanel: true,
                margin: 3,
                border: 1,
                urlGeoJson: cuadrantes.q23?atob(cuadrantes.q23):null,
                cuadrante:'23'
            }));
            /* Daniel O. Medina https://softguard.atlassian.net/browse/DSS-629
            */
            var flotagps23 = view.down('#23').down('#23');
            flotagps23.down('#west').setWidth(180);
            var btnpoi23 = flotagps23.down('#poi');
            
            btnpoi23.down('poigridview').gmap = flotagps23.down('#googlemap');
            /************* */             
        }, /*6000*/7000);//Daniel O. Medina incremento el tiempo por tarea DSS-889
            
    },
    
    onSaveClick: function(btn){
        var view = btn.up('vehiclequadview');
        // tomo los records para guardar en la meta
        var objCuadrates = {}
        
        if(view.down('#11').down('flotagpsview') && view.down('#11').down('flotagpsview').urlGeoJson) {
            objCuadrates.q11 = btoa(view.down('#11').down('flotagpsview').urlGeoJson);
        }
        if(view.down('#12').down('flotagpsview') && view.down('#12').down('flotagpsview').urlGeoJson) {
            objCuadrates.q12 = btoa(view.down('#12').down('flotagpsview').urlGeoJson);;
        }
        if(view.down('#13').down('flotagpsview') && view.down('#13').down('flotagpsview').urlGeoJson) {
            objCuadrates.q13 = btoa(view.down('#13').down('flotagpsview').urlGeoJson);;
        }
        if(view.down('#21').down('flotagpsview') && view.down('#21').down('flotagpsview').urlGeoJson) {
            objCuadrates.q21 = btoa(view.down('#21').down('flotagpsview').urlGeoJson);;
        }
        if(view.down('#22').down('flotagpsview') && view.down('#22').down('flotagpsview').urlGeoJson) {
            objCuadrates.q22 = btoa(view.down('#22').down('flotagpsview').urlGeoJson);;
        }
        if(view.down('#23').down('flotagpsview') && view.down('#23').down('flotagpsview').urlGeoJson) {
            objCuadrates.q23 = btoa(view.down('#23').down('flotagpsview').urlGeoJson);;
        }
        
        if(!view.security.cuadrantes) {
            view.security.cuadrantes = {};
        }
        view.security.cuadrantes = objCuadrates;
        var json = Ext.encode(view.security);
        Ext.Ajax.request({
            url: view.url,
            method: 'PUT',
            params: json,
            success: function(resp,operation) {            
                notify('Se guardo la seleccion.');
            }
        });
    }
});