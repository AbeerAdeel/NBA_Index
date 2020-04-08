import defaults from 'superagent-defaults';

const request = defaults();

request.on('request', (req) => {
  if (localStorage.getItem('current-loc')) {
    if (localStorage.getItem('current-loc') === 'All Locations') {
      request.unset('X-LOC_TAG');
    } else {
      request.set('X-LOC_TAG', localStorage.getItem('current-loc'));
    }
  }

  req.on('response', (res) => {
  });

  req.on('error', () => {
    // mixpanel tracking of api_error disabled for billing purposes [PDMH-3806].
  });
});

export default request;