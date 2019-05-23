import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import task from '../../../prop-types/taskPropType';
import Typography from '@material-ui/core/Typography';
import TasksProgressBar from '../TasksProgressBar';
import TasksTabbedContainer from '../TasksTabbedContainer';
import mockTasks from '../../../common/mocks/tasks';
import styles from './TasksOverview.module.css';

export default class TasksOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.setState({
      tasks: mockTasks,
    });
  }

  render() {
    const { tasks } = this.state;
    return (
      <React.Fragment>
        <div className={styles.topContainer}>
          <Typography variant="h4" color="inherit">
            To Do List for {moment().format('dddd, MMMM Do YYYY')}
          </Typography>
        </div>
        <TasksProgressBar tasks={tasks} />
        <TasksTabbedContainer tasks={tasks} />
      </React.Fragment>
    );
  }
}

TasksOverview.propTypes = {
  tasks: PropTypes.arrayOf(task),
};