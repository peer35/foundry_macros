function tokenUpdate(data) {
    canvas.tokens.controlled.map(token => token.update(data));
}

const torchAnimation = {"type": "torch", "speed": 1, "intensity": 5};
const sunAnimation = {"type": "sunburst", "speed": 1, "intensity": 1};
const ghostlyAnimation = {"type": "ghost", "speed": 1, "intensity": 5}
const sunLight = (radius) => {
    return {
        "dimLight": 2 * radius,
        "brightLight": radius,
        "lightAngle": 360,
        "lightAnimation": sunAnimation,
        "lightColor": "#fbff80",
        "lightAlpha": 0.2
    }
}
const flameLight = (dim, bright) => {
    return {
        "dimLight": dim,
        "brightLight": bright,
        "lightAngle": 360,
        "lightAnimation": torchAnimation,
        "lightColor": "#ffeb68",
        "lightAlpha": 0.3
    }
}

let dialogEditor = new Dialog({
    title: `Token Light Picker`,
    content: `Pick the light source the selected token is holding.`,
    buttons: {
        none: {
            label: `None`,
            callback: () => {
                tokenUpdate({"dimLight": null, "brightLight": null, "lightAngle": 360,});
                dialogEditor.render(true);
            }
        },
        torch: {
            label: `Torch`,
            callback: () => {
                tokenUpdate(flameLight(40, 20));
                dialogEditor.render(true);
            }
        },
        faerie: {
            label: `Faerie fire`,
            callback: () => {
                tokenUpdate({
                    "dimLight": 10,
                    "brightLight": 0,
                    "lightAngle": 360,
                    "lightAnimation": ghostlyAnimation,
                    "lightColor": "#ff00ff",
                    "lightAlpha": 0.6
                });
                dialogEditor.render(true);
            }
        },
        light: {
            label: `Light cantrip`,
            callback: () => {
                tokenUpdate({
                    "dimLight": 40,
                    "brightLight": 20,
                    "lightAngle": 360,
                    "lightAnimation": {"type": "none"},
                    "lightColor": "#dfffff",
                    "lightAlpha": 0.2
                });
                dialogEditor.render(true);
            }
        },
        sunlight10: {
            label: `Sunlight 10ft`,
            callback: () => {
                tokenUpdate(sunLight(10));
                dialogEditor.render(true);
            }
        },
        sunlight15: {
            label: `Sunlight 15ft`,
            callback: () => {
                tokenUpdate(sunLight(15));
                dialogEditor.render(true);
            }
        },
        sunlight20: {
            label: `Sunlight 20ft`,
            callback: () => {
                tokenUpdate(sunLight(20));
                dialogEditor.render(true);
            }
        },
        sunlight25: {
            label: `Sunlight 25ft`,
            callback: () => {
                tokenUpdate(sunLight(25));
                dialogEditor.render(true);
            }
        },
        sunlight30: {
            label: `Sunlight 30ft`,
            callback: () => {
                tokenUpdate(sunLight(30));
                dialogEditor.render(true);
            }
        },
        lamp: {
            label: `Lamp`,
            callback: () => {
                tokenUpdate(flameLight(45, 15));
                dialogEditor.render(true);
            }
        },
        bullseye: {
            label: `Bullseye Lantern`,
            callback: () => {
                tokenUpdate({
                    "dimLight": 120,
                    "brightLight": 60,
                    "lightAngle": 45,
                    "lightAnimation": torchAnimation,
                    "lightColor": "#ffeb68",
                    "lightAlpha": 0.4
                });
                dialogEditor.render(true);
            }
        },
        hoodedOpen: {
            label: `Hooded Lantern (Open)`,
            callback: () => {
                tokenUpdate(flameLight(60, 30));
                dialogEditor.render(true);
            }
        },
        hoodedClosed: {
            label: `Hooded Lantern (Closed)`,
            callback: () => {
                tokenUpdate(flameLight(5, 0));
                dialogEditor.render(true);
            }
        },
        darkness: {
            label: `Darkness spell`,
            callback: () => {
                tokenUpdate({
                    "dimLight": 0,
                    "brightLight": -15,
                    "lightAngle": 360,
                    "lightAnimation": {"type": "none"}});
                dialogEditor.render(true);
            }
        },
        crusadingShortsword: {
            label: `Crusading Shortsword`,
            callback: () => {
                tokenUpdate({
                    "dimLight": 30,
                    "brightLight": 15,
                    "lightAngle": 360,
                    "lightAnimation": {"type": "none"},
                    "lightColor": "#97b7ee",
                    "lightAlpha": 0.5
                });
                dialogEditor.render(true);
            }
        },
        frostbrand: {
            label: `Frostbrand`,
            callback: () => {
                tokenUpdate({
                    "dimLight": 20,
                    "brightLight": 10,
                    "lightAngle": 360,
                    "lightAnimation": {"type": "none"},
                    "lightColor": "#1351df",
                    "lightAlpha": 0.5
                });
                dialogEditor.render(true);
            }
        },
        thighbone: {
            label: `Thighbone`,
            callback: () => {
                tokenUpdate({
                    "dimLight": 40,
                    "brightLight": 20,
                    "lightAngle": 360,
                    "lightAnimation": {"type": "none"},
                    "lightColor": "#22a006",
                    "lightAlpha": 0.2
                });
                dialogEditor.render(true);
            }
        },
        close: {
            icon: "<i class='fas fa-tick'></i>",
            label: `Close`
        },
    },
    default: "close",
    close: () => {
    }
});

dialogEditor.render(true)