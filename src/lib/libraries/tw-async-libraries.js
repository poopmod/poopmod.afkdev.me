import poopAURL from '../../components/poopmodAssets/costumes/poop-a.svg';
import poopBURL from '../../components/poopmodAssets/costumes/poop-b.svg';

const localCostumeURLs = {
    '03a6f3d0fcec269804fe30fedd406821.svg': poopAURL,
    '3e9eb3e7f143dca1696d18136fc7d9d8.svg': poopBURL
};

const asyncLibrary = callback => {
    let data = null;
    return () => {
        if (data) return data;
        return callback()
            .then(mod => (data = mod.default));
    };
};

const withLocalCostumeURLs = items => items.map(item => {
    const localURL = localCostumeURLs[item.md5ext];
    if (localURL) {
        return {
            ...item,
            rawURL: localURL
        };
    }
    if (item.costumes) {
        const costumes = item.costumes.map(costume => ({
            ...costume,
            rawURL: localCostumeURLs[costume.md5ext] || costume.rawURL
        }));
        return {
            ...item,
            rawURL: costumes[0] && costumes[0].rawURL,
            costumes
        };
    }
    return item;
});

export const getBackdropLibrary = asyncLibrary(
    () => import(/* webpackChunkName: "library-backdrops" */ './backdrops.json')
);
export const getCostumeLibrary = asyncLibrary(
    () => import(/* webpackChunkName: "library-costumes" */ './costumes.json')
        .then(mod => ({default: withLocalCostumeURLs(mod.default)}))
);
export const getSoundLibrary = asyncLibrary(
    () => import(/* webpackChunkName: "library-sounds" */ './sounds.json')
);
export const getSpriteLibrary = asyncLibrary(
    () => import(/* webpackChunkName: "library-sprites" */ './sprites.json')
        .then(mod => ({default: withLocalCostumeURLs(mod.default)}))
);
