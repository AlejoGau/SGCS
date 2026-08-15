//MIGRADO2024
Ext.define( 'Common.controller.EventImagesController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'EventImagesSearchModel', 'grabacionimgSearchModel' ],
views: [ 'EventImagesGridView' ],
init: function () {
    // genero los eventos
    this.control( {
        'eventimagesgridview': {
            afterrender: this.initview,
            close: this.onClose,
            hide: this.onClose,
            destroy: this.onClose
        },
        'eventimagesgridview button[action=refresh]': {
            click: this.onRefreshClick
        },
        'eventimagesgridview #imagenes': {
            click: this.onImagnesClick
        }
    });
}, // cierro init
onImagnesClick: function (btn ) {
    var view = btn.up( 'eventimagesgridview' );
    var _rec_iid = view.record.get( 'rec_iid' );
    var tablaDatos = view.record.get( 'tablaDatos' );
    if( !tablaDatos ) {
        // genero tabladatos a mano porque no vengo de reportehistorico
        var rec_tfechahora = new Date( view.record.get( 'rec_isoFechaHora' ) ); // dedalo 24/02/2021 rect_fechahora esta vacio, tomo iso
        tablaDatos = 'p_recepcion' + Ext.Date.format( rec_tfechahora, 'Ym' );
    }
    if( btn._pressed ) {
        btn.setText( getLocale( 'Mostrar imagenes posteriores' ) )
        btn._pressed = false
        view.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + _rec_iid + '&cue_iid=' + view.record.get( 'cue_iid' ) + '&thum=false&onlyEvent=true&moduleCaller=' + this.application._nameModule + '&tabla=' + tablaDatos )
    } else {
        btn.setText( getLocale( 'Mostrar imagenes solo del evento' ) )
        btn._pressed = true
        view.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + _rec_iid + '&cue_iid=' + view.record.get( 'cue_iid' ) + '&thum=false&onlyEvent=false&moduleCaller=' + this.application._nameModule + '&tabla=' + tablaDatos )
    }
},
    
onClose: function(view ) {
    // Ext.TaskManager.stop(view.taskSound);
},
    
initview: function (view ) {
    var controller = this;
    var tablaDatos = view.record.get( 'tablaDatos' );
    var _rec_iid = view.record.get( 'rec_iid' );
    if( !tablaDatos ) {
        // genero tabladatos a mano porque no vengo de reportehistorico
        var rec_tfechahora = new Date( view.record.get( 'rec_isoFechaHora' ) ); // dedalo 24/02/2021 rect_fechahora esta vacio, tomo iso
        tablaDatos = 'p_recepcion' + Ext.Date.format( rec_tfechahora, 'Ym' );
    }
    if( view.imagenesSoloDelEvento ) {
        view.down( '#imagenes' ).setText( getLocale( 'Mostrar imagenes posteriores' ) )
        view.down( '#imagenes' )._pressed = false
        //view.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + _rec_iid + '&cue_iid=' + view.record.get( 'cue_iid' ) + '&thum=false&onlyEvent=true&moduleCaller=' + this.application._nameModule + '&tabla=' + tablaDatos )
        var target = view.down( '#imagenesSlider' );
        target.load({
            src: '/handler/EventImagenGalleryHTML?rec_iid=' + _rec_iid + '&cue_iid=' + view.record.get( 'cue_iid' ) + '&thum=false&onlyEvent=true&moduleCaller=' + this.application._nameModule + '&tabla=' + tablaDatos
        });
    } else {
        view.down( '#imagenes' ).setText( getLocale( 'Mostrar imagenes solo del evento' ) )
        view.down( '#imagenes' )._pressed = true
        //console.error("EventImagesController acá hay que agregar para que haga el refresh segun el parametro ")
        //var nombre_parametro = getParametro( 'nombre_parametro' );
        //view.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + _rec_iid + '&cue_iid=' + view.record.get( 'cue_iid' ) + '&time='+nombre_parametro+'&refresh=true&thum=false&onlyEvent=false&moduleCaller=' + this.application._nameModule )
        var target = view.down( '#imagenesSlider' );
        target.load({
            src: '/handler/EventImagenGalleryHTML?rec_iid=' + _rec_iid + '&cue_iid=' + view.record.get( 'cue_iid' ) + '&refresh=true&thum=false&onlyEvent=false&moduleCaller=' + this.application._nameModule 
        });
        //view.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + _rec_iid + '&cue_iid=' + view.record.get( 'cue_iid' ) + '&refresh=true&thum=false&onlyEvent=false&moduleCaller=' + this.application._nameModule )
    }
    if( view.hideChoserImage ) {
        view.down( '#imagenes' ).hide()
    }
},
    
loadimages: function(view ) {
    if( view.isVisible() )
        view.store.load();
},
    
doBindStore: function(records, operation, success ) {
    if( success ) {
        var view = operation.view;
        view.bindStore( operation.store );
    }
},
    
onRefreshClick: function(button, object, options ) {
    var view = button.up( 'eventimagesgridview' );
    this.doRefresh( view );
},
    
doRefresh: function(view ) {
    if( !view ) {
        view = Ext.ComponentQuery.query( 'eventimagesgridview' )[ 0 ];
    }
    var _rec_iid = view.record.get( 'rec_iid' );
    var store = view.getStore();
    store.load( {
        rec_iid: _rec_iid,
        store: store,
        panel: view
    });
}
});