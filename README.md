# Javascript Tempo Timesheets API for node.js

A node.js module, which expands on the functionality of the [jira node.js module](https://github.com/steves/node-jira)
to include interaction with the Tempo Timesheets Add-On for Jira.

Jira REST API documentation can be found [here](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)

Tempo Tìmesheets REST API documentation can be found [here](http://developer.tempo.io/doc/timesheets/api/rest/latest/)

## Example

First a JiraApi instance must be created, then a JiraTempoApi instance can be created with the JiraApi as a parameter:

```
JiraApi = require('jira').JiraApi;
jira = new JiraApi(protocol, host, port, username, password, apiVersion, verbose, strictSSL, oauth, base);
//
JiraTempoApi = require('jiratempo').JiraTempoApi;
jiratempo = new JiraTempoApi(jira, tempoApiVersion);
```

Jira methods can be called on the JiraApi instance, Tempo Timesheets methods are called on the JiraTempoApi instance:

```
jira.findIssue(issueNumber, function(error, issue) {});
//
jiratempo.getWorklogById(worklogId, function(error, worklog) {});
```


## Implemented APIs

- Get worklogs
- Get a single worklog by id
- Create a worklog
- Update a worklog
- Delete a worklog