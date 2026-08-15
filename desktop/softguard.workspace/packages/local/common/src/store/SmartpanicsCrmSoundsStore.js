//MIGRADO2024
Ext.define('Common.store.SmartpanicsCrmSoundsStore', {
    extend: 'Ext.data.Store',
    storeId: 'SmartpanicsCrmSoundsStore',
    fields: ['codigo', 'nombre','soundpath'],
    data : [
        {"codigo":"0","nombre":"Sonido default", "soundpath":"/sounds/notification_push.wav"},
        {"codigo":"1","nombre":"Sonido 1", "soundpath":"/sounds/Push-Sonido1.mp3"},
        {"codigo":"2","nombre":"Sonido 2", "soundpath":"/sounds/Push-Sonido2.mp3"},
        {"codigo":"3","nombre":"Sonido 3", "soundpath":"/sounds/Push-Sonido3.mp3"},
        {"codigo":"4","nombre":"Sonido 4", "soundpath":"/sounds/Push-Sonido4.mp3"},
        {"codigo":"5","nombre":"Sonido 5", "soundpath":"/sounds/Push-Sonido5.mp3"}
    ]
});