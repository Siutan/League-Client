const production = !process.env.ROLLUP_WATCH;
module.exports = {
    variants: {
        extend: {
            width: ["responsive", "hover", "focus"],
            grid: ["responsive", "hover", "focus"],
            gridTemplateColumns: ["responsive", "hover", "focus"],
        }
    },
    theme: {
        extend: {
            backgroundImage: {
                'background-1': "url('../public/img/background-1.jpg')"
            },
            spacing: {
                '100': '30rem',
                '200': '40rem',
                '300': '50rem',
            }
        }
    },
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    plugins: [
    ],
    purge: {
        content: [
            "./src/App.svelte",
        ],
        enabled: production // disable purge in dev
    },
};