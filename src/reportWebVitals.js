const reportWebVitals = onPerfEntry => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
            getFID(onPerfEntry);
            getCLS(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
            getFCP(onPerfEntry);
        });
    }
};

export default reportWebVitals;
