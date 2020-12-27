import React from 'react';
import { Colors } from "@blueprintjs/core";
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import {Flex} from 'reflexbox';
import ModuleNetatmoRainGraphContainer from "../containers/ModuleNetatmoRainGraphContainer";
import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAModule3 } from "../models/NetatmoNAModule3";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";
import {Orientation} from "../store/application/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module_data: INetatmoNAModule3|undefined
    device_id: string|undefined
    selected_timelapse: '12h'|'1d'|'1m'
    distance_unit: string
    rain_ratio: number
    orientation: Orientation
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch extends WithTranslation {
    [key: string]: any
    fetchMeasure: typeof netatmoActions.fetchMeasure
    t: i18next.TFunction
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

/** Rain module */
const NetatmoModuleRain: React.FunctionComponent<AllProps> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            vertical_divider={props.orientation === 'landscape'}
            icon='rain'
            radioLevel={props.module_data?.radio}
            batteryLevel={props.module_data?.battery}
        >
            <div className="modules-layout">
                <Flex flexDirection='row'>
                    <div style={{width: props.orientation === 'portrait' ? '78%' : '60%'}}>
                        <ModuleNetatmoRainGraphContainer />
                    </div>
                    <Flex flexDirection='column' style={{width: props.orientation === 'portrait' ? '22%' : '40%'}}>
                        <div onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['Rain'], props.selected_timelapse)} style={{textAlign: 'right'}}>
                            <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.t('netatmo.cumulative')}</div>
                            {props.module_data?.data?.sum_rain_24}<small>{props.distance_unit}</small>
                        </div>
                        <div onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['Rain'], props.selected_timelapse)} style={{textAlign: 'right'}}>
                            <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.distance_unit}/h</div>
                            {props.module_data?.data?.sum_rain_1}
                        </div>
                    </Flex>
                </Flex>
            </div>
        </ModuleLayout>
    )
};

export default withTranslation('common')(NetatmoModuleRain)
