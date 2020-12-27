import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import ModuleNetatmoRainGraph from "../components/ModuleNetatmoRainGraph";
import {ApplicationState} from "../store";

const mapStateToProps = ({ netatmo, application }: ApplicationState) => ({
    data: netatmo.measure_rain_data,
    phone: application.phone,
    mobile: application.mobile,
    orientation: application.orientation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoRainGraphContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoRainGraph);

export default ModuleNetatmoRainGraphContainer
