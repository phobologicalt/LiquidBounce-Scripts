///api_version=2
(script = registerScript({
    name: "RedeAuth",
    authors: ["Enoughdv", "cancernameu"],
    version: "0.5"
})).import("Core.lib");

var S45PacketTitle = Java.type('net.minecraft.network.play.server.S45PacketTitle');
var S2FPacketSetSlot = Java.type('net.minecraft.network.play.server.S2FPacketSetSlot');
var C0EPacketClickWindow = Java.type('net.minecraft.network.play.client.C0EPacketClickWindow');
var C01PacketChatMessage = Java.type('net.minecraft.network.play.client.C01PacketChatMessage');

var authenticated = false;
var password = "564asd654561";

module = {
    category: "Redesky",
    description: "Captcha solver & Auto login",
    onUpdate: function () {
        if (mc.thePlayer.ticksExisted < 2) authenticated = false
    },
    onPacket: function(e){
        if (e.getPacket() instanceof S45PacketTitle && !authenticated) {
            if (e.getPacket().getMessage().getFormattedText().match(/\/register/)) {
                mc.thePlayer.sendQueue.addToSendQueue(new C01PacketChatMessage("/register " + password + " " + password));
                authenticated = true;
                if(mc.getCurrentServerData().serverIP.match(/^2187ge/))
                chat.print("§a[RedeAuth] You're ready to play!")
            }
            else if (e.getPacket().getMessage().getFormattedText().match(/\/login/)) {
                mc.thePlayer.sendQueue.addToSendQueue(new C01PacketChatMessage("/login " + password));
                authenticated = true;
                if(mc.getCurrentServerData().serverIP.match(/^2187ge/))
                chat.print("§a[RedeAuth] You're ready to play!")
            } 
        }
        else if (e.getPacket() instanceof S2FPacketSetSlot) {
            if (e.getPacket().func_149174_e().getDisplayName().match(/Clique aqui/)) {
                mc.thePlayer.sendQueue.addToSendQueue(new C0EPacketClickWindow(e.getPacket().func_149175_c(), e.getPacket().func_149173_d(), 0, 0, e.getPacket().func_149174_e(), 31337));
            }
        }
    }
}
