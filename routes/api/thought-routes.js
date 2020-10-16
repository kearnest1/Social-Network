const router = require('express').Router();
const {
  removeThought,
  getThoughtById,
} = require('../../controllers/thought-controller');

router.route('/:thoughtId').post(getThought);

router
  .route('/:userId/:thoughtId')
  .put(getThoughtById)
  .delete(removeThought);

router.route('/:userId/:thoughtId/:replyId').delete(removeThought);

module.exports = router;
