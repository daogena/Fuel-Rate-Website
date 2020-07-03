import React, { Component } from 'react';
import {
    Button,
    Form, 
    FormGroup,
    Label, 
    Input,
} from 'reactstrap';

class QuoteForm extends Component
{
    constructor(props){
        super(props) 
            this.state = {
                gallons: 0,
                date : '',
                texas: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = this.state
        console.log("Final Data is: ", data)
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div>
            <Form onSubmit= {this.onSubmit} className = 'Quote'>
                <FormGroup>
                    <Label for='Gallons'>Gallons Req</Label>
                    <Input 
                        type='number'
                        name = 'gallons'
                        placeholder = 'Number of Gallons'
                        className = 'mb-3'
                        onChange = {this.onChange}
                    />
                    
                    <Label for= 'Date'>Delivery</Label>
                    <Input 
                        type='date'
                        name ='date'
                        className = "mb-3"
                        onChange = {this.onChange}
                    />

                    <Button type='submitForm'>Submit</Button>

                    </FormGroup>
            </Form>
        </div>
        );
    }
}

export default QuoteForm;