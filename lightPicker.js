function tokenUpdate(data) {
    canvas.tokens.controlled.map(token => token.document.update({light: data}));
}

/*
alpha - color intensity:
0.3 - 0.55
0.2 - 0.45
0.1 - 0.3
0.05 - 0.2
 */

const torchAnimation = {"type": "torch", "speed": 1, "intensity": 5};
const sunAnimation = {"type": "sunburst", "speed": 1, "intensity": 1};
const ghostlyAnimation = {"type": "ghost", "speed": 1, "intensity": 5}
const sunLight = (radius) => {
    return {
        "dim": 2 * radius,
        "bright": radius,
        "angle": 360,
        "luminosity": 1.0,
        "animation": sunAnimation,
        "color": "#fbff80",
        "alpha": 0.15,
    }
}
const flameLight = (dim, bright) => {
    return {
        "dim": dim,
        "bright": bright,
        "luminosity": 0.4,
        "angle": 360,
        "animation": torchAnimation,
        "color": "#ffeb68",
        "alpha": 0.15
    }
}

let dialogEditor = new Dialog({
    title: `Token Light Picker`,
    content: `Pick the light source the selected token is holding.
    <style>
    #lightPicker .dialog-buttons {
        flex-direction: column;
    }
    </style>`,
    buttons: {
        none: {
            label: `None`,
            callback: () => {
                tokenUpdate({"dim": 0, "bright": 0, "angle": 360,});
                dialogEditor.render(true);
            }
        },
        bullseye: {
            label: `Bullseye Lantern`,
            callback: () => {
                tokenUpdate({
                    "dim": 120,
                    "bright": 60,
                    "luminosity": 0.6,
                    "angle": 45,
                    "animation": torchAnimation,
                    "color": "#ffeb68",
                    "alpha": 0.3
                });
                dialogEditor.render(true);
            }
        },
        crusadingShortsword: {
            label: `Crusading Shortsword`,
            callback: () => {
                tokenUpdate({
                    "dim": 30,
                    "bright": 15,
                    "angle": 360,
                    "luminosity": 0.3,
                    "animation": {"type": "none"},
                    "color": "#065ef8",
                    "alpha": 0.2
                });
                dialogEditor.render(true);
            }
        },
        darkness: {
            label: `Darkness spell`,
            callback: () => {
                tokenUpdate({
                    "dim": 0,
                    "bright": -15,
                    "luminosity": -0.9,
                    "angle": 360,
                    "animation": {"type": "none"}
                });
                dialogEditor.render(true);
            }
        },
        dayLight: {
            label: `Daylight spell`,
            callback: () => {
                tokenUpdate({
                    "dim": 120,
                    "bright": 60,
                    "luminosity": 0.6,
                    "angle": 360,
                    "animation": {"type": "none"},
                    "color": "#dfffff",
                    "alpha": 0.2
                });
                dialogEditor.render(true);
            }
        },
        faerie: {
            label: `Faerie fire`,
            callback: () => {
                tokenUpdate({
                    "dim": 10,
                    "bright": 0,
                    "luminosity": 0.3,
                    "angle": 360,
                    "animation": ghostlyAnimation,
                    "color": "#ff00ff",
                    "alpha": 0.4
                });
                dialogEditor.render(true);
            }
        },
        frostbrand: {
            label: `Frostbrand`,
            callback: () => {
                tokenUpdate({
                    "dim": 20,
                    "bright": 10,
                    "luminosity": 0.3,
                    "angle": 360,
                    "animation": {"type": "none"},
                    "color": "#1351df",
                    "alpha": 0.2
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
        lamp: {
            label: `Lamp`,
            callback: () => {
                tokenUpdate(flameLight(45, 15));
                dialogEditor.render(true);
            }
        },
        light: {
            label: `Light cantrip`,
            callback: () => {
                tokenUpdate({
                    "dim": 40,
                    "bright": 20,
                    "luminosity": 0.6,
                    "angle": 360,
                    "animation": {"type": "none"},
                    "color": "#dfffff",
                    "alpha": 0.2
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
        thighbone: {
            label: `Thighbone`,
            callback: () => {
                tokenUpdate({
                    "dim": 40,
                    "bright": 20,
                    "luminosity": 1.0,
                    "angle": 360,
                    "animation": {"type": "none"},
                    "color": "#22a006",
                    "alpha": 0.2
                });
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
        close: {
            icon: "<i class='fas fa-tick'></i>",
            label: `Close`
        },
    },
    default: "close",
    close: () => {
    }
}, {id: "lightPicker"});

dialogEditor.render(true)
