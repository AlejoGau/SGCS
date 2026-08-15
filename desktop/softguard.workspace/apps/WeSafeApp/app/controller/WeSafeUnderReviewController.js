Ext.define('WeSafe.controller.WeSafeUnderReviewController', {
    extend: 'Ext.app.Controller',
    stores: ['WeSafeEventosInformadosStore'],
    views: ['WeSafeUnderReviewView'],

    init: function () {
        this.control({
            'WeSafeUnderReviewView grid': {
                afterrender: this.initView
            },
            'WeSafeUnderReviewView button[text="Aprobado"]': {
                click: this.handleChangeEstado
            },
            'WeSafeUnderReviewView button[text="Denegado"]': {
                click: this.handleChangeEstado 
            }
        });
    },

    initView: function (grid) {
        var store = Ext.data.StoreManager.lookup('WeSafeEventosInformadosStore');
        grid.setStore(store);

        store.load({
            params: { estado: 'Revision' },
            callback: function (records, operation, success) {
                if (success) {
                    grid.getView().refresh();
                } else {
                    Ext.Msg.alert('Error', 'No se pudieron cargar los datos.');
                }
            }
        });
    },

    handleChangeEstado: function (button, nuevoEstado) {
        var grid = button.up('grid');
        var selectedRecords = grid.getSelectionModel().getSelection();

        if (selectedRecords.length > 0) {
            Ext.Msg.confirm('Confirmación', '¿Está seguro de que desea cambiar el estado de los registros seleccionados?', function (choice) {
                if (choice === 'yes') {
                    Ext.each(selectedRecords, function (record) {
                        this.updateEstado(record.get('id'), nuevoEstado, grid);
                    }, this);
                }
            }, this);
        } else {
            Ext.Msg.alert('Aviso', 'No hay registros seleccionados.');
        }
    },

    updateEstado: function (id, estado, grid) {
        Ext.Ajax.request({
            url: '/rest/search/EventosInformados_UpdateEstado',
            params: { Id: id, Estado: estado },
            method: 'GET',
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result.success) {
                    Ext.Msg.alert('Éxito', 'Estado actualizado correctamente.');
                    grid.getStore().reload({ params: { estado: 'Revision' } });
                } else {
                    Ext.Msg.alert('Error', 'No se pudo actualizar el estado.');
                }
            },
            failure: function () {
                Ext.Msg.alert('Error', 'Ocurrió un error al intentar actualizar el estado.');
            }
        });
    },

    loadMultimedia: function (id, type, title) {
        var mediaTypeMap = {
            "audio": ["MP3", "WAV"],
            "video": ["MP4", "AVI"],
            "imagen": ["JPG", "PNG", "JPEG"]
        };
    
        var fileTypes = mediaTypeMap[type] || [];
        if (fileTypes.length === 0) {
            Ext.Msg.alert('Error', 'Tipo de multimedia no reconocido.');
            return;
        }
    
        // Obtener la base URL dinámica del sistema
        var serverBaseUrl = window.location.origin;
    
        // Si la aplicación está en localhost, reemplazar con la URL correcta
        if (serverBaseUrl.includes("localhost") || serverBaseUrl.includes("127.0.0.1")) {
            serverBaseUrl = "https://gcs.softguard.com";
        }
    
        console.log("Base URL usada:", serverBaseUrl);
    
        var url = `/Rest/search/SGSP_VideoLinkParser?_dc=${Date.now()}&iRecID=${id}`;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (!result.success || !result.rows || result.rows.length === 0) {
                    Ext.Msg.alert('Error', 'No se encontró contenido multimedia.');
                    return;
                }
    
                // Filtrar SOLO los archivos del tipo correcto y eliminar duplicados
                var seenFiles = new Set(); // Almacena nombres de archivos únicos
                var filteredMedia = result.rows.filter(item => {
                    var itemType = item.grm_cTipo ? item.grm_cTipo.trim().toUpperCase() : "";
                    var fileName = item.grm_cArchivo || ""; // Obtener el nombre del archivo
    
                    if (fileTypes.includes(itemType) && !seenFiles.has(fileName)) {
                        seenFiles.add(fileName); // Agregar archivo al Set para evitar duplicados
                        return true;
                    }
                    return false;
                });
    
                if (filteredMedia.length === 0) {
                    Ext.Msg.alert('Error', `No hay archivos disponibles de tipo ${type}.`);
                    return;
                }
    
                // Construcción de URLs correctas
                var mediaData = filteredMedia.map(media => {
                    var relativePath = media.grm_cArchivo ? `SharedImages/PostImages/${media.grm_cArchivo}` : null;
                    var fullPath = relativePath ? `${serverBaseUrl}/gallery/${relativePath}` : null;
                    return {
                        url: fullPath,
                        name: media.grm_cArchivo || "Archivo sin nombre"
                    };
                }).filter(item => item.url); // Solo archivos con URL válida
    
                if (mediaData.length === 0) {
                    Ext.Msg.alert('Error', 'No se pudo generar ninguna URL válida.');
                    return;
                }
    
                console.log("Archivos multimedia filtrados (sin duplicados):", mediaData);
    
                var existingWindow = Ext.ComponentQuery.query(`window[mediaId=${id}]`)[0];
                if (existingWindow) {
                    existingWindow.toFront();
                    return;
                }
    
                var currentIndex = 0;
                var mediaPanel = Ext.create('Ext.panel.Panel', {
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'component',
                            itemId: 'mediaViewer',
                            autoEl: {
                                tag: type === 'imagen' ? 'img' : (type === 'audio' ? 'audio' : 'video'),
                                src: mediaData[currentIndex].url,
                                controls: type !== 'imagen',
                                style: `
                                    max-width: 100%;
                                    max-height: 100%;
                                    width: 100%;
                                    height: auto;
                                    object-fit: contain;
                                    background-color: ${type === 'video' ? '#000' : 'transparent'};
                                `
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'panel',
                            itemId: 'fileInfo',
                            dock: 'bottom',
                            height: 30,
                            html: `<div style="text-align:center; font-weight:bold; padding:5px;">
                                    ${mediaData[currentIndex].name} (${currentIndex + 1} de ${mediaData.length})
                                   </div>`,
                            border: false
                        }
                    ],
                    bbar: (mediaData.length > 1) ? [
                        { 
                            text: '⬅ Anterior', 
                            handler: function () {
                                currentIndex = (currentIndex === 0) ? mediaData.length - 1 : currentIndex - 1;
                                var viewer = mediaPanel.down('#mediaViewer').el.dom;
                                viewer.src = mediaData[currentIndex].url;
                                mediaPanel.down('#fileInfo').update(`<div style="text-align:center; font-weight:bold; padding:5px;">
                                    ${mediaData[currentIndex].name} (${currentIndex + 1} de ${mediaData.length})
                                   </div>`);
                                console.log("Actualizando nombre:", mediaData[currentIndex].name);
                            }
                        },
                        '->', 
                        { 
                            text: 'Siguiente ➡', 
                            handler: function () {
                                currentIndex = (currentIndex === mediaData.length - 1) ? 0 : currentIndex + 1;
                                var viewer = mediaPanel.down('#mediaViewer').el.dom;
                                viewer.src = mediaData[currentIndex].url;
                                mediaPanel.down('#fileInfo').update(`<div style="text-align:center; font-weight:bold; padding:5px;">
                                    ${mediaData[currentIndex].name} (${currentIndex + 1} de ${mediaData.length})
                                   </div>`);
                                console.log("Actualizando nombre:", mediaData[currentIndex].name);
                            }
                        }
                    ] : []
                });
    
                Ext.create('Ext.window.Window', {
                    title: title,
                    width: 700,
                    height: type === 'audio' ? 180 : 550,
                    modal: true,
                    layout: 'fit',
                    autoScroll: true,
                    mediaId: id,
                    items: mediaPanel
                }).show();
            },
            failure: function () {
                Ext.Msg.alert('Error', 'Ocurrió un error al cargar el contenido multimedia.');
            }
        });
    }
    
    
});
