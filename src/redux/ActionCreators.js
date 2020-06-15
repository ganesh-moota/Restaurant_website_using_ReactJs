import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
});

export const postComment = (dishId,rating,author,comment) => (dispatch) => {
    const newComment = {
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl+'comments',{
        method:'POST',
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify(newComment),
        credentials:'same-origin',
    })
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = Error("Error : "+response.status+" "+response.statusText);
            error.response = response;
            throw error;
        }
    },error => {
        var errorMsg = Error(error.message);
        throw errorMsg;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        console.log("Post comment "+error.message);
        alert("Your comment could not be posted\nError : "+error.message);
    });
};

export const postFeedback = (feedback) => (dispatch) => {
    const newFeedback = {
        "firstname": feedback.firstname,
        "lastname": feedback.lastname,
        "telnum": feedback.telnum,
        "email": feedback.email,
        "agree": feedback.agree,
        "contactType": feedback.contactType,
        "message": feedback.message,
    };

    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl+'feedback',{
        method:'POST',
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify(newFeedback),
        credentials:'same-origin',
    })
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = Error("Error : "+response.status+" "+response.statusText);
            error.response = response;
            throw error;
        }
    },error => {
        var errorMsg = Error(error.message);
        throw errorMsg;
    })
    .then(response => response.json())
    .then(response => {
        alert(JSON.stringify(response));
    })
    .catch(error => {
        console.log("Post Feedback "+error.message);
        alert("Your feedback could not be posted\nError : "+error.message);
    });
}

export const dishesLoading = () => ({
    type:ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmsg) => ({
    type:ActionTypes.DISHES_FAILED,
    payload:errmsg
});

export const addDishes = (dishes) => ({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = Error("Error : "+response.status+" "+response.statusText);
                error.response = response;
                throw error;
            }
        },error => {
            var errorMsg = Error(error.message);
            throw errorMsg;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => {
            dispatch(dishesFailed(error.message));
        });       
}

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl+'comments')
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = Error("Error "+response.status+": "+response.statusText);
                error.response = response;
                throw error;
            }
        },error => {
            var errorMsg = Error(error.message);
            throw errorMsg;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => {
            dispatch(commentsFailed(error.message));
        });       
}

export const commentsFailed = (errmsg) => ({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errmsg
});

export const addComments = (comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
});

export const promosLoading = () => ({
    type:ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmsg) => ({
    type:ActionTypes.PROMOS_FAILED,
    payload:errmsg
});

export const addPromos = (promos) => ({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl+'promotions')
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = Error("Error : "+response.status+" "+response.statusText);
                error.response = response;
                throw error;
            }
        },error => {
            var errorMsg = Error(error.message);
            throw errorMsg;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => {
            dispatch(promosFailed(error.message));
        });       
}

export const leadersLoading = () => ({
    type:ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errorMsg) => ({
    type:ActionTypes.LEADERS_FAILED,
    payload:errorMsg,
});

export const addLeaders = (leaders) => ({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders,
})

export const fetchLeaders = () => (dispatch)=> {
    dispatch(leadersLoading(true));

    return fetch(baseUrl+'leaders')
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = Error("Error "+response.status+": "+response.statusText);
                error.response = response;
                throw error;
            }
        },error => {
            var errorMsg = Error(error.message);
            throw errorMsg;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addLeaders(dishes)))
        .catch(error => {
            dispatch(leadersFailed(error.message));
        });
}

