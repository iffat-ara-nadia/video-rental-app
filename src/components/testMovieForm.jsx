import React from 'react';
import Joi from "joi-browser";
import Form from "./common/form";

class MovieForm extends Form{
  state = {
    data:{title: "", genre:"", numberInStock="", rate=""},
    errors:{}
  };

schema = {
  title: Joi.string().required().label('Title'),
  genre: Joi.string().required().label('Genre'),
  numberInStock: Joi.number().required().label('Number in Stock'),
  rate: Joi.number().required().label('Rate')
};



doSubmit = () =>{
  console.log("submitted");
}


  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title','Title')}
          {this.renderInput('genre', 'Genre')}
          {this.renderInput('numberInStock','Number in Stock')}
          {this.renderInput('rate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;

//  const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>Movie Form {match.params.id}</h1>
//       <button
//         className="btn btn-primary"
//         onClick={() => history.push("/movies")}
//       >
//         Save
//       </button>
//     </div>
//   );
// };
// 