import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table';

const Overview = props => {
    const { info } = props;

    // const { duration } = info;
    // const metadata = {
    //     name: info.name,
    //     duration: duration,
    //     bitrate: info.bit_rate,
    //     url: info.url,
    //     nb_streams: info.nb_streams,
    //     flags: info.flags
    // };

    return (
        <div className="card mt-1">
            <div className="card-body">
                <h4 className="card-title">{info.url}</h4>
                <h6 className="card-subtitle mb-2">
                    <span style={{ marginRight: "1em"}}>Duration: {info.duration}</span>
                    <span>Bitrate: {info.bit_rate}</span>
                </h6>
                {/* <div className="row">
                    <div className="col-md-3">
                        <h4>Version</h4>
                        <StackedTable data={info.versions}/>
                    </div>

                    <div className="col-md-3">
                        <h4>Metadata</h4>
                        <StackedTable data={metadata}/>
                    </div>
                </div> */}
                <div className="row">
                    <Table data={info.streams} />
                </div>
            </div>
        </div>
    )
}

Overview.propTypes = {
    info: PropTypes.object.isRequired
}

export default Overview
