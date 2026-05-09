import projectData from './project-data';

/* eslint-disable import/no-unresolved */
import overrideDefaultProject from '!arraybuffer-loader!./default-project.sb3';
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg';
import costume1 from '!raw-loader!./penguin.svg';
import poopA from '!raw-loader!../../components/poopmodAssets/costumes/poop-a.svg';
import poopB from '!raw-loader!../../components/poopmodAssets/costumes/poop-b.svg';
/* eslint-enable import/no-unresolved */
import { TextEncoder } from '../tw-text-encoder';

const getTextEncoder = () => {
    if (typeof TextEncoder === 'undefined') {
        return require('text-encoding').TextEncoder;
    }
    return TextEncoder;
};

const getLocalAssets = encoder => ([
    {
        id: 'cd21514d0531fdffb22204e0ec5ed84a',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }, {
        id: 'c434b674f2da18ba13cdfe51dbc05ecc',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume1)
    }, {
        id: '03a6f3d0fcec269804fe30fedd406821',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(poopA)
    }, {
        id: '3e9eb3e7f143dca1696d18136fc7d9d8',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(poopB)
    }
]);

const defaultProject = translator => {
    const _TextEncoder = getTextEncoder();
    const encoder = new _TextEncoder();

    if (overrideDefaultProject.byteLength > 0) {
        return [{
            id: 0,
            assetType: 'Project',
            dataFormat: 'JSON',
            data: overrideDefaultProject
        }, ...getLocalAssets(encoder)];
    }

    const projectJson = projectData(translator);
    return [{
        id: 0,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    }, ...getLocalAssets(encoder)];
};
export default defaultProject;
