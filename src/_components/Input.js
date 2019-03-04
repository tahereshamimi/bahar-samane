// import React, { Component } from 'react';
// import { Row } from 'reactstrap';
// class Input extends Component {
//     state = {
//         note: '',
//         importance: false,
//         visibility: false,
//         importanceButton:'gray-button'
//     }


//     changeImportance = () => {
//         this.setState({ importance: !this.state.importance });
//         if (this.state.importance===true) {
//             this.setState({ importanceButton:'gray-button' });
//         }
//         else{
//             this.setState({ importanceButton:'red-button' });
//         }
    

//     }

//     // in this part typed note are added to state, and save buttun visibility is checked
//     addNote = (e) => {
//         if (e.target.value === '') {
//             this.setState({ visibility: false });
//         }
//         else {
//             this.setState({ visibility: true })
//         }
//         this.setState({
//             note: e.target.value
//         })
//     }

//     onSubmit = (e) => {
//         if (e.target.value !== "") {
//             let note = e.target.value
//             this.setState(() => ({ note }));
//             e.target.value = "";
//         }
//         e.preventDefault();
//     }


//     render() {
//         return (
//             <Row className='justify-content-center' >
            
//                 <form onSubmit={this.onSubmit} className='input-card p-3'>
//                     <div>
//                         <span className={this.state.importanceButton}
//                             onClick={this.changeImportance}>{this.state.importance ? 'urgent' : 'normal'}
//                         </span>
//                     </div>
//                     <div>
//                         <textarea className='textarea mt-3' name='note' placeholder="enter note" onChange={this.addNote} > </textarea>
//                     </div>
//                     <div>
//                         {this.state.visibility ? <span type='submit' className='save-button'>save</span> : null}
//                     </div>
//                 </form>
//             </Row>
//         )
//     }
// }

// export { Input }