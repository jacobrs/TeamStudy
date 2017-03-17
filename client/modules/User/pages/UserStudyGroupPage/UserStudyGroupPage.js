import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import callApi from '../../../../util/apiCaller';

// Import Components
import StudyGroupForm from '../../components/UserStudyGroupForm/UserStudyGroupForm';

// Import Actions
import { createStudyGroupRequest } from '../../UserActions';

class UserStudyGroupPage extends Component {
  constructor(props) {
    super(props);
    this.createStudyGroup = this.createStudyGroup.bind(this);
    this.addUserStudyGroups = this.addUserStudyGroups.bind(this);
  }

  createStudyGroup = (groupName, course, teacher, description) => {
    this.props.createStudyGroupRequest({
      groupName,
      course,
      teacher,
      description,
    });
  };

  addUserStudyGroups = (groupName, course, teacher, description) => {
    this.props.addUserStudyGroupsRequest(this.props.users,{
      groupName,
      course,
      teacher,
      description,
    });
  };

  render() {
    return (
      <div>
        <StudyGroupForm createStudyGroup={this.createStudyGroup} addUserStudyGroups={this.addUserStudyGroups} />
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

// Retrieve data from store as props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createStudyGroupRequest, addUserStudyGroups }, dispatch);
}

UserStudyGroupPage.propTypes = {
  studyGroups: PropTypes.arrayOf(PropTypes.shape({
    groupName: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    teacher: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  })),
  createStudyGroupRequest: PropTypes.func.isRequired,
  addUserStudyGroupsRequest: PropTypes.func.isRequired,
};

UserStudyGroupPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStudyGroupPage);
