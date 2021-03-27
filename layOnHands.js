//######################################################################################################
// READ THIS FIRST!!!!!!
// Requires Callback macro "ActiveEffect", You can find this in my "Callback Macros" Folder
// ^ Reason players "cannot" make changes to actors they do not own.
// Usage:
// 1) Midi-qol On Use, best used within Item Macro.
// 2) Adjust line 21 "resourceSlot" to whatever you need either "primary", "secondary" or "tertiary".
//    Note: this relates to the resources tracked on the attributes tab of the character sheet
//
// Source: https://gitlab.com/crymic/foundry-vtt-macros/-/blob/master/5e/Classes/Paladin/Lay%20on%20Hands.js
//######################################################################################################

(async ()=>{
    async function wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
    let ActiveEffect = game.macros.getName("ActiveEffect");
    let target = canvas.tokens.get(args[0].targets[0]._id);
    let illegal = ["undead", "construct"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
    let itemD = args[0].item;
    let actorD = args[0].actor;
    let getActor = game.actors.get(args[0].actor._id);
    let resourceSlot = "primary";
    let curtRes = actorD.data.resources[resourceSlot].value;
    let maxResRnd = actorD.data.resources[resourceSlot].max/5;
    let curtResRnd = Math.floor(actorD.data.resources[resourceSlot].value/5);
    let maxHealz = Math.clamped(actorD.data.resources[resourceSlot].value, 0,target.actor.data.data.attributes.hp.max - target.actor.data.data.attributes.hp.value);
    if (args[0].targets.length != 1) return ui.notifications.error(`Please select a single target.`);
    if (illegal) return ui.notifications.error(`You cannot use Lay on Hands on this target.`);
    if (curtRes === null) return ui.notifications.warn(`You are out of the required resources.`);
    let content_loh = `<p>Which <strong>Action</strong> would you like to do? [${curtRes}] points remaining.</p>`;
    new Dialog({
        title: "Lay on Hands",
        content: content_loh,
        buttons: {
            cure: { label: "Cure Condition", callback: () => loh_cure() },
            heal: { label: "Heal", callback: () => loh_heal() }
        }
    }).render(true);
// Condition Curing Function
    function loh_cure(){
        let condition_list = ["Diseased", "Poisoned"];
        let effect = target.actor.effects.filter( i=> condition_list.includes(i.data.label));
        let selectOptions = "";
        for (let i = 0; i < effect.length; i++){
            let condition = effect[i].data.label;
            selectOptions +=`<option value="${condition}">${condition}</option>`;
        }
        if (selectOptions === "") {
            return ui.notifications.warn(`There's nothing to Cure on ${target.name}.`);
        } else {
            let content_cure = `<p><em>${actorD.name} Lays on Hands on ${target.name}.</em></p><p>Choose a Condition Cure | [${curtResRnd}/${maxResRnd}] charges left.</p><form class="flexcol"><div class="form-group"><select id="element">${selectOptions}</select></div></form>`;
            new Dialog({
                title: "Lay on Hands: Curing",
                content: content_cure,
                buttons: {
                    yes:{
                        icon: '<i class="fas fa-check"></i>',
                        label: 'Cure!',
                        callback: async (html) => {
                            let element = html.find('#element').val();
                            ActiveEffect.execute(target.id, element, "remove");
                            resourceSlot === "primary" ? getActor.update({"data.resources.primary.value" : curtRes - 5}) : resourceSlot === "secondary" ? getActor.update({"data.resources.secondary.value" : curtRes - 5}) : getActor.update({"data.resources.tertiary.value" : curtRes - 5});
                            let chatContent = `<div class="midi-qol-nobox"><div class="midi-qol-flex-container"><div>Cures ${element}:</div><div class="midi-qol-target-npc midi-qol-target-name" id="${target.data._id}"> ${target.name}</div><div><img src="${target.data.img}" width="30" height="30" style="border:0px"></img></div></div></div>`;
                            await wait(500);
                            const chatMessage = game.messages.get(args[0].itemCardId);
                            let content = duplicate(chatMessage.data.content);
                            const searchString =  /<div class="midi-qol-hits-display">[\s\S]*<div class="end-midi-qol-hits-display">/g;
                            const replaceString = `<div class="midi-qol-hits-display"><div class="end-midi-qol-hits-display">${chatContent}`;
                            content = content.replace(searchString, replaceString);
                            chatMessage.update({content: content});
                        }
                    }
                }
            }).render(true);
        }
    }
// Healing Function
    function loh_heal() {
        let content_heal = `<p><em>${actorD.name} lays hands on ${target.name}.</em></p><p>How many HP do you want to restore to ${target.name}?</p><form class="flexcol"><div class="form-group"><label for="num">HP to Restore: (Max = ${maxHealz})</label><input id="num" name="num" type="number" min="0" max="${maxHealz}"></input></div></form>`;
        new Dialog({
            title: "Lay on Hands: Healing",
            content: content_heal,
            buttons: {
                heal: { icon: '<i class="fas fa-check"></i>', label: 'Heal', callback: async (html) => {
                        let number = Math.floor(Number(html.find('#num')[0].value));
                        if (number < 1 || number > maxHealz) {
                            return ui.notifications.warn(`Invalid number of charges entered = ${number}. Aborting action.`);
                        } else {
                            let damageRoll = new Roll(`${number}`).roll();
                            new MidiQOL.DamageOnlyWorkflow(getActor, target, damageRoll.total, "healing", [target], damageRoll, {flavor: `(Healing)`, itemCardId: args[0].itemCardId});
                            resourceSlot === "primary" ? await getActor.update({"data.resources.primary.value" : curtRes - number}) : resourceSlot === "secondary" ? await getActor.update({"data.resources.secondary.value" : curtRes - number}) : await getActor.update({"data.resources.tertiary.value" : curtRes - number});
                        }
                    }
                }
            }
        }).render(true);
    }
})();
