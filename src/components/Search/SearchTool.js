import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

class SearchTool extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allResults: [],
            searchTerm: "",
        } 
    }

    async componentDidMount(){
        if (!this.props.auth.token) {
            localStorage.setItem('preLoginPage', '/tool/find')
            this.props.history.push('/login')
        }
        var elems = document.querySelectorAll('select');
        var instances = window.M.FormSelect.init(elems);

    }

    handleSearch = (e) => {
            this.setState( {
                searchTerm: e.target.value
            })
        }
    handleSubmit= (e) =>{
            e.preventDefault();
            // const searchData = {...this.state.searchTerm}
            const searchTools = axios.get(`${window.apiHost}/tools?q=${this.state.searchTerm}`);
            searchTools.then((resp)=>{
                const results = resp.data;
                console.log(results)
                this.setState({
                    allResults : results
                })
        })
        }

    render(){
        const results = this.state.allResults.map((result, key)=>{
            return <li key={key}>{result.title}</li>
        })
        const toolPath = `${window.apiHost}`
        console.log(toolPath)
        console.log(this.props)
        return(        
        <div style={{marginTop: "100px"}}>
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.search} onChange={this.handleSearch}/>
            <button type="submit">Search</button>
            </form>
            <ul>{results}</ul>
        </div>)
    }
}

function mapStateToProps(state) {
    return( {
        auth: state.auth,
    })
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {
        // hostHomeAction: hostHomeAction
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchTool);