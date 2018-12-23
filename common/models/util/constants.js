/**
 * @typedef {Object} returnValue
 * @property {number} response_code
 * @property {string} message
 * @property {Object} data
 */

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}


exports.HTTP_STATUS_DELAY = 202;

define('ACTIVATION_CODE_EXPIRE_TIME', 10 * 60); // 10 minutes

define('UNFINISHED_TRANSACTION_EXPIRED', 6 * 60 * 60); // 6 hours
define('CUSTOMER_MAX_DISTANCE', 20 * 1000); // 20 kilometers

define('TIME_DELAY', 0); // 10s, between 2 transactions

define('TRANSACTION_PENDING', 1);
define('TRANSACTION_DELIVERING', 2);
define('TRANSACTION_DELIVERED', 3);
define('TRANSACTION_CANCELED', 4);

// login
exports.MSG_INVALID_USER_INFO = 'Thông tin người dùng không chính xác, vui lòng kiểm tra lại';
exports.MSG_UPDATE_PASSWORD_FAILED = 'Cập nhật mật khẩu thất bại, vui lòng thử lại sau!';
exports.MSG_UPDATE_PASSWORD_DIFFER = 'Mật khẩu mới phải khác mật khẩu cũ!';
exports.MSG_UPDATE_PASSWORD_SUCCESS = 'Cập nhật mật khẩu thành công!';
exports.MSG_INVALID_PHONE_NUMBER = 'Thông tin số điện thoại không chính xác!';

exports.MSG_LOGIN_SUCCESS = 'Đăng nhập thành công';
exports.MSG_LOGIN_FAILED = 'Đã có lỗi xảy ra, vui lòng thử lại sau!';
exports.MSG_INVALID_PASSWORD = 'Mật khẩu chưa chính xác!';

// register
exports.MSG_REGISTER_SUCCESS = 'Đăng ký thành công!';
exports.MSG_UPDATE_ROLE_SUCCESS = 'Cập nhật quyền thành công!';
exports.MSG_REGISTER_FAILED = 'Đã có lỗi xảy ra, vui lòng thử lại!';

// verify
exports.MSG_PHONE = 'SĐT đã tồn tại! vui lòng sử dụng SĐT khác!';
exports.MSG_EMAIL = 'Email đã tồn tại! vui lòng sử dụng email khác!';
exports.MSG_VERIFY_STUDENT_MISSING_ID = 'Vui lòng nhập đúng số chứng minh thư!';
exports.MSG_VERIFY_STUDENT_SUCCESS = 'Đã gửi yêu cầu xác thực! Chúng tôi sẽ phản hồi sớm cho bạn!';
exports.MSG_UNVERIFY_STUDENT_SUCCESS = 'Hủy xác thực sinh viên thành công!';
exports.MSG_VERIFY_STUDENT_FAILED = 'Đã có lỗi xảy ra, vui lòng thử lại sau!';
exports.MSG_VERIFY_INVALID_STUDENT = 'Tài khoản của bạn đang chờ xác thực hoặc đã bị từ chối, vui lòng liên hệ để biết thêm chi tiết!';
exports.MSG_VERIFY_STUDENT_ISVERIFY = 'Tài khoản của bạn đã được xác thực!';

// update profile
exports.MSG_UPDATE_PROFILE_FAILED = 'Đã có lỗi xảy ra, vui lòng thử lại sau';
exports.MSG_UPDATE_PROFILE_EMAIL_USED = 'Tài khoản email này đã được sử dụng!, vui lòng nhập email khác';
exports.MSG_UPDATE_PROFILE_SUCCESS = 'Cập nhật thông tin thành công';
exports.MSG_DB_ERROR = 'Có lỗi xảy ra, vui lòng thử lại sau';
exports.MSG_VERIFY_FAILED = 'Tài khoản của bạn chưa được xác thực, vui lòng cập nhập thông tin!';

exports.MESSAGE_GET_FAILED  = 'Thực hiện không thành công';
exports.MESSAGE_ADD_SUCCESS = 'Thêm thành công';
exports.MESSAGE_ADD_FAILED  = 'Thêm không thành công';
exports.MESSAGE_UPDATE_SUCCESS = 'Cập nhật thành công';
exports.MESSAGE_UPDATE_FAILED  = 'Cập nhật không thành công';
exports.MESSAGE_REMOVE_SUCCESS = 'Xoá thành công';
exports.MESSAGE_REMOVE_FAILED  = 'Xoá không thành công';
exports.MESSAGE_NOT_FOUND      = 'Đối tượng không tìm thấy';

exports.MESSAGE_BUY_SUCCESS = 'Buy success';
exports.MESSAGE_BUY_FAILED = 'Buy failed';

exports.HTTP_STATUS_OK = 200;
exports.HTTP_STATUS_ERROR = 201;
exports.HTTP_STATUS_NOT_FOUND = 404;
exports.HTTP_STATUS_MULTI_RESPONSE = 207;
exports.HTTP_STATUS_PASSED_PERIOD = 611;
exports.HTTP_STATUS_VERIFY = 202;

// orders
exports.MSG_ORDERS_SUCCESS = 'Đặt hàng thành công!';
exports.MSG_ORDERS_FAILED = 'Đặt hàng không thành công!';
exports.MSG_USER_NOT_ENOUGHT = 'Bạn không đủ điều kiện mua hàng!';
exports.MSG_ORDERS_CANCEL_SUCCESS = 'Hủy đơn hàng hành công!';
exports.MSG_ORDERS_CANCEL_FAILED = 'Không thể hủy đơn hàng!';
exports.MSG_ORDERS_CANNOT = 'Bạn không thể đặt tiếp sản phầm này!';
exports.MSG_ORDERS_INVALID = 'Bạn chưa đặt sản phầm này!';
exports.MSG_ORDERS_SUPPLIER_INVALID = 'Sản phẩm này của đối tác khác! Vui lòng kiểm tra lại';

exports.MSG_USER_VERIFY = 'Tài khoản của bạn chưa được xác thực, vui lòng cập nhập thông tin!';
exports.MSG_USER_VERIFY_PENDING = 'Tài khoản của bạn đang trong quá trình chờ phê duyệt từ Campus+';
exports.MSG_FAILED = 'Đã có lỗi xảy ra, vui lòng thử lại sau!';
exports.MSG_SUCCESS = 'Thành công!';

// Static Roles
exports.ROLES = ['admin', 'NEH', 'MODUSE', 'CAMPAIGN', 'JOB', 'STUDENT', 'POST',
    'SUPERAD', 'MODUSER_ROLE_NEWS', 'ACCOUNTING', 'BANKING', 'CSKH', 'STUDENT', 'MIRI', 'ENGLISH'];