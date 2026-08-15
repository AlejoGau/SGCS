//MIGRADO2024
Ext.define( 'Common.controller.SPEventoVideoController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'p_rximgSearchModel' ],
views: [ 'SPEventoVideoView' ],
init: function () {
    this.control( {
        'speventovideoview': {
            afterrender: this.initView,
            beforeclose: this.killTask
        }
    });
}, // cierro init
initView: function (view ) {
    //this.getSound(view.record, view)
    var record = view.record;
    var controller = this;
    view.videosItemIds = [];
    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getP_rximgSearchModelModel(),
        remoteFilter: true,
        autoload: false,
        filters: [
            {
                property: 'cue_iid',
                value: record.get( 'cue_iid' )
            },
            {
                property: 'rxi_irecid:GTEINT',
                value: record.get( 'rec_iid' )
            }, {
                property: 'rxi_cTipo:IN',
                value: 'mp4'
            }
        ]
    });
    //this.loadData(view);
    /**
     * BC 390368233 : Se desea refrescar la tab de videos, para lo cual recargo el Store con una TASK.
     *
     * */
    view.task = Ext.TaskManager.start( {
        args: [ view ],
        run: this.loadData,
        scope: controller,
        interval: 10000
    });
},
killTask: function(view ) {
    Ext.TaskManager.stop( view.task );
},
loadData: function(view ) {
    var controller = this;
    var store = view.store;
    store.load( {
        callback: function( records ) {
            store.each( function( record, k ) {
                var arrPath = record.get( 'rxi_cImg' ).split( '\\' );
                var filename = arrPath[ arrPath.length - 1 ];
                var soundPath;
                var rxi_iId = record.get( 'rxi_iId' );
                if( filename.toUpperCase().indexOf( 'MP4' ) != -1 ) {
                    var d = new Date();
                    var n = d.getTime();
                    var accountpath = record.get( 'cue_clinea' ).trim() + '_' + record.get( 'cue_ncuenta' ).trim();
                    var rec_tfechahora = record.get( 'rec_tfechahora' );
                    var datepath = Ext.Date.format( rec_tfechahora, 'Ym' );
                    var mediasrc = '/gallery/video/' + datepath + '/' + accountpath + '/' + filename;
                    if( Ext.Array.indexOf( view.videosItemIds, '#video-' + rxi_iId ) == -1 ) { // solo sumo la toolbar si hay mas 1 video.
                        view.add( Ext.create( 'Ext.Component', {
                            //html: '<iframe src="'+soundPath+'" style="height:50px; width:100%" />',
                            html: '<video controls style="height: 140px; width:100%; margin: 5px 0 5px 0;"><source src="' + mediasrc + '" type="video/mp4">' + getLocale( "Su browser no soporta video HTML5" ) + '.</video>',
                            height: 50,
                            width: '100%',
                            itemId: 'video-' + rxi_iId,
                            hidden: true
                        }) )
                        view.down( 'toolbar' ).add( {
                            xtype: 'button',
                            text: rxi_iId,
                            _videoId: '#video-' + rxi_iId,
                            handler: function( btn ) {
                                //escondo todos los videos
                                Ext.Array.each( view.videosItemIds, function( item ) {
                                    view.down( item ).hide()
                                })
                                //muestro el video seleccionado
                                view.down( btn._videoId ).show()
                            }
                        })
                    }
                    view.videosItemIds.push( '#video-' + rxi_iId )
                }
            })
            //muestro el primer video cuando inicio
            view.down( view.videosItemIds[ 0 ] ).show()
        }
    });
}
});