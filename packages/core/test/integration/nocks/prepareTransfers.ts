import * as nock from 'nock'
import { IRICommand, GetBalancesCommand, GetBalancesResponse } from '../../../../types'
import headers from './headers'

export const getBalancesCommand: GetBalancesCommand = {
    command: IRICommand.GET_BALANCES,
    addresses: [
        'FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX',
        '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB',
        'OTSZGTNPKFSGJLUPUNGGXFBYF9GVUEHOADZZTDEOJPWNEIVBLHOMUWPILAHTQHHVSBKTDVQIAEQOZXGFB',
    ],
    threshold: 100,
}

const getBalancesResponse: GetBalancesResponse = {
    balances: ['3', '4', '10'],
    milestone: 'M'.repeat(81),
    milestoneIndex: 1,
    duration: 10,
}

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
        addresses: ['FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX'],
    })
    .reply(200, {
        states: [true],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
        addresses: ['9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB'],
    })
    .reply(200, {
        states: [false],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
        addresses: ['OTSZGTNPKFSGJLUPUNGGXFBYF9GVUEHOADZZTDEOJPWNEIVBLHOMUWPILAHTQHHVSBKTDVQIAEQOZXGFB'],
    })
    .reply(200, {
        states: [false],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', getBalancesCommand)
    .reply(200, getBalancesResponse)

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.FIND_TRANSACTIONS,
        addresses: ['9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB'],
    })
    .reply(200, {
        hashes: ['A'.repeat(81)],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.FIND_TRANSACTIONS,
        addresses: ['OTSZGTNPKFSGJLUPUNGGXFBYF9GVUEHOADZZTDEOJPWNEIVBLHOMUWPILAHTQHHVSBKTDVQIAEQOZXGFB'],
    })
    .reply(200, {
        hashes: [],
    })
