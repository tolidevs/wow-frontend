import React, {Component} from 'react'
import { Dropdown, Segment } from 'semantic-ui-react'
import API from '../API'

const options = [{ key: 0, text: 'My subscribed services', value: "subscriptions" }]

class FilterDropDown extends Component {
    
    state = {
        options: options
    }

    getServices = () => {
        API.getAllServices()
            .then(services => this.mapServicesToOptions(services))
    }

    mapServicesToOptions = (services) => {
        const options_array = [...options]
        services.map(service => {
            let servObj = { key: service.id, text: service.name, value: service.id}
            options_array.push(servObj)
        })
        this.setState({
            options: options_array
        })
    }

    componentDidMount() {
        this.getServices()
    }

    handleChange = (e, { value }) => {
        this.props.setFilter(value)
    }

    render() {

        return (
            <Segment
                basic
                textAlign="center"
            >
                <Dropdown
                    clearable
                    options={this.state.options}
                    fluid
                    selection
                    search
                    placeholder="Filter by streaming services..."
                    onChange={this.handleChange}
                    />
            </Segment>
            )
    }
}


export default FilterDropDown