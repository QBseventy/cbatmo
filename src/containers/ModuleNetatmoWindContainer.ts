import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoWind from "../components/ModuleNetatmoWind"
import * as netatmoActions from "../store/netatmo/actions";
import {Timelapse} from "../types/netatmo";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.WIND,
    device_id: netatmo.station_data?.id,
    unit: application.user.windunit,
    selected_timelapse: netatmo.selected_timelapse,
    wind_ratio: application.user.wind_ratio,
    orientation: application.orientation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse))
});

const ModuleNetatmoWindContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoWind);

export default ModuleNetatmoWindContainer
