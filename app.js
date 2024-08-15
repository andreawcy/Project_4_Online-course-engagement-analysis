// Function to create the charts for the dashboard
function createCharts(selectedGrade) {
  d3.json('Resources/StudentsPerfromance.json').then(data => {
    // Handle the "Overall" option to include all data
    let filteredData = selectedGrade === "Overall" ? data : data.filter(d => d.GRADE === Number(selectedGrade));

    // Calculate total number of students for the selected grade
    let totalStudents = filteredData.length;

    // Update the summary panel with the total number of students
    document.getElementById('summary-panel').innerHTML = `<p>Total number of students: ${totalStudents}</p>`;

    // Overall grade summary pie chart
    let overallGradeCounts = d3.rollup(data, v => v.length, d => d.GRADE_LABEL);
    let overallGradeLabels = Array.from(overallGradeCounts.keys());
    let overallGradeValues = Array.from(overallGradeCounts.values());

    let overallGradeTrace = {
      labels: overallGradeLabels,
      values: overallGradeValues,
      type: 'pie'
    };

    let overallGradeLayout = {
      title: 'Overall Grade Summary',
      height: 400
    };

    Plotly.newPlot('overallGradePieChart', [overallGradeTrace], overallGradeLayout);

    // Graduated High School pie chart
    let graduatedCounts = d3.rollup(filteredData, v => v.length, d => d['Graduated high-school type']);
    let graduatedLabels = {
      1: 'Private',
      2: 'State',
      3: 'Other'
    };
    let graduatedValues = [];
    Object.keys(graduatedLabels).forEach(key => {
      graduatedValues.push(graduatedCounts.get(Number(key)) || 0);
    });

    let graduatedTrace = {
      labels: Object.values(graduatedLabels),
      values: graduatedValues,
      type: 'pie'
    };

    let graduatedLayout = {
      title: 'Graduated High School',
      height: 400
    };

    Plotly.newPlot('graduatedPieChart', [graduatedTrace], graduatedLayout);

    // Scholarship Type pie chart
    let scholarshipCounts = d3.rollup(filteredData, v => v.length, d => d['Scholarship type']);
    let scholarshipLabels = {
      1: 'None',
      2: '25%',
      3: '50%',
      4: '75%',
      5: 'Full'
    };
    let scholarshipValues = [];
    Object.keys(scholarshipLabels).forEach(key => {
      scholarshipValues.push(scholarshipCounts.get(Number(key)) || 0);
    });

    let scholarshipTrace = {
      labels: Object.values(scholarshipLabels),
      values: scholarshipValues,
      type: 'pie'
    };

    let scholarshipLayout = {
      title: 'Scholarship Type',
      height: 400
    };

    Plotly.newPlot('scholarshipPieChart', [scholarshipTrace], scholarshipLayout);

    // Attendance in Class bar chart
    let attendanceCounts = d3.rollup(filteredData, v => v.length, d => d['Attendance to classes']);
    let attendanceLabels = {
      1: 'Always',
      2: 'Sometimes',
      3: 'Never'
    };
    let attendanceValues = [];
    Object.keys(attendanceLabels).forEach(key => {
      attendanceValues.push(attendanceCounts.get(Number(key)) || 0);
    });

    let attendanceTrace = {
      x: Object.values(attendanceLabels),
      y: attendanceValues,
      type: 'bar'
    };

    let attendanceLayout = {
      title: 'Attendance in Class',
      height: 400,
      yaxis: { title: '# of Students' }
    };

    Plotly.newPlot('attendanceBarChart', [attendanceTrace], attendanceLayout);

    // Weekly Study Hours bar chart
    let studyHoursCounts = d3.rollup(filteredData, v => v.length, d => d['Weekly study hours']);
    let studyHoursLabels = {
      1: 'None',
      2: '<5 hours',
      3: '6-10 hours',
      4: '11-20 hours',
      5: 'More than 20 hours'
    };
    let studyHoursValues = [];
    Object.keys(studyHoursLabels).forEach(key => {
      studyHoursValues.push(studyHoursCounts.get(Number(key)) || 0);
    });

    let studyHoursTrace = {
      x: Object.values(studyHoursLabels),
      y: studyHoursValues,
      type: 'bar'
    };

    let studyHoursLayout = {
      title: 'Weekly Study Hours',
      height: 400,
      yaxis: { title: '# of Students' }
    };

    Plotly.newPlot('studyHoursBarChart', [studyHoursTrace], studyHoursLayout);

    // Dual bar chart for Taking Notes in Class and Listening in Class
    let notesCounts = d3.rollup(filteredData, v => v.length, d => d['Taking notes in classes']);
    let listeningCounts = d3.rollup(filteredData, v => v.length, d => d['Listening in classes']);

    let notesLabels = {
      1: 'Never',
      2: 'Sometimes',
      3: 'Always'
    };
    let notesValues = [];
    let listeningValues = [];
    Object.keys(notesLabels).forEach(key => {
      notesValues.push(notesCounts.get(Number(key)) || 0);
      listeningValues.push(listeningCounts.get(Number(key)) || 0);
    });

    let notesTrace = {
      x: Object.values(notesLabels),
      y: notesValues,
      name: 'Taking Notes',
      type: 'bar'
    };

    let listeningTrace = {
      x: Object.values(notesLabels),
      y: listeningValues,
      name: 'Listening',
      type: 'bar'
    };

    let dualBarLayout = {
      title: 'Taking Notes vs Listening in Class',
      barmode: 'group',
      height: 400,
      yaxis: { title: '# of Students' }
    };

    Plotly.newPlot('notesListeningBarChart', [notesTrace, listeningTrace], dualBarLayout);
  });
}

// Function to run on page load
function init() {
  // Load the JSON data to populate the dropdown with grade labels
  d3.json('Resources/StudentsPerfromance.json').then(data => {
    let gradeLabels = [
      { value: 'Overall', text: 'Overall' },
      { value: '7', text: 'AA' },
      { value: '6', text: 'BA' },
      { value: '5', text: 'BB' },
      { value: '4', text: 'CB' },
      { value: '3', text: 'CC' },
      { value: '2', text: 'DC' },
      { value: '1', text: 'DD' },
      { value: '0', text: 'Fail' }
    ];

    let dropdown = d3.select("#selGrade");

    gradeLabels.forEach(grade => {
      dropdown.append("option")
        .text(grade.text)
        .attr("value", grade.value);
    });

    // Initialize the charts with the "Overall" option
    createCharts("Overall");

    // Set up event listener for grade label selection
    dropdown.on("change", function() {
      let selectedGrade = d3.select(this).property("value");
      createCharts(selectedGrade);
    });
  });
}

// Initialize the dashboard
init();
