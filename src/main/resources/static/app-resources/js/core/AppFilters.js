SocialApp
    .filter('member', function () {
        return function (member) {
            if (member) {
                var memberType = member.memberType.code;
                var memberLegalName = member.legalName || '';
                var memberIndividualName = (member.firstName || '') + ' ' + (member.lastName || '');
                var memberNumber = member.memberNumber;

                var memberName = '';
                if (memberType === 'CORPORATE') {
                    if (memberLegalName.trim().length > 0) {
                        memberName = memberLegalName;
                    } else {
                        memberName = memberIndividualName;
                    }
                } else {
                    if (memberIndividualName.trim().length > 0) {
                        memberName = memberIndividualName;
                    } else {
                        memberName = memberLegalName;
                    }
                }

                return memberName.trim() + ' - ' + memberNumber;
            }

            return '';
        };
    });

SocialApp.filter('ellipsis', function () {
    var EMPTY_STRING = '';

    return function (string, length) {
        var thisLength = length || 20;

        if (string) {
            if (string.length <= thisLength) {
                return string;
            }

            return string.substring(0, thisLength) + '...';
        }


        return EMPTY_STRING;
    }
});

