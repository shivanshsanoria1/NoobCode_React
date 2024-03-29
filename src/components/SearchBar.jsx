import { useState } from 'react';

import SolutionsCard from './SolutionsCard';
import classes from './css/SearchBar.module.css'
import SolutionStatBoxes from './SolutionStatBoxes'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [solutionsObj, setSolutionsObj] = useState({})

  async function getSolution(quesId) {
    // // dummy data
    // setSolutionsObj(dummydata_cpp)
    // //console.log(dummydata)
    // setSearchTerm('')
    // return
    
    //console.log(quesId)
    
    if(isNaN(parseInt(quesId))){
      alert('Invalid question Number')
      setSearchTerm('')
      setSolutionsObj({})
      return
    }

    if(sessionStorage.getItem(quesId.toString())){
      const data = JSON.parse(sessionStorage.getItem(quesId.toString()))
      setSolutionsObj({ quesId, ...data})

    }else{
      const response = await fetch(`${process.env.REACT_APP_ORIGIN}/solutions/${quesId}`)
      const data = await response.json()
      console.log(data)
      setSolutionsObj(data)

      if(data.found === false){
      }else{
        sessionStorage.setItem(data.quesId.toString(), JSON.stringify({
          title: data.title,
          language: data.language,
          acceptedSolutions: data.acceptedSolutions,
          unacceptedSolutions: data.unacceptedSolutions
        }))
      }
    }

    setSearchTerm('')
  }

  return (
    <>
      <div className={classes.searchBarContainer}>
        <input 
        placeholder='Enter Leetcode Question Number'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 ? getSolution(searchTerm) : null}
        />
        <button onClick={() => getSolution(searchTerm)}>
          Search
        </button>
      </div>

      {
        Object.keys(solutionsObj).length === 0 ? (
          <>
            <div className={classes.msgBox}>
              <h2>
                Welcome! Search for over <i>1000 solutions</i>  from leetcode.com
              </h2>
            </div>
            <SolutionStatBoxes />
          </>
        ) : (
          solutionsObj.found === false ? (
            <div className={classes.msgBox}>
              <h2>
                Solution not found {':('}
              </h2>
            </div>
          ) : (
            <SolutionsCard solutionsObj={solutionsObj} />
          )
        )
      }
    </>
  )
}

export default SearchBar

// ------------------ DUMMT DATA ---------------------- //

const dummydata_sql = {
  "quesId":1661,
  "title":"average time of process per machine",
  "language":"sql",
  "acceptedSolutions":["# Write your MySQL query statement below\r\nselect machine_id, round(sum(time_diff)/count(process_id), 3) as processing_time\r\nfrom\r\n  (select A.machine_id, A.process_id, (B.timestamp - A.timestamp) as time_diff\r\n  from Activity A\r\n  inner join Activity B\r\n  on A.machine_id = B.machine_id and A.process_id = B.process_id \r\n  and A.activity_type='start' and B.activity_type = 'end') as T1\r\ngroup by machine_id;","# Write your MySQL query statement below\r\nselect machine_id, round(avg(\r\n  case\r\n    when activity_type='start' then -timestamp\r\n    else timestamp\r\n  end\r\n)*2, 3) as processing_time\r\nfrom Activity\r\ngroup by machine_id;","# Write your MySQL query statement below\r\nselect machine_id, \r\nround(avg(if(activity_type='start', -timestamp, timestamp))*2, 3) as processing_time\r\nfrom Activity\r\ngroup by machine_id;"],
  "unacceptedSolutions":[]
  }
  
  const dummydata_js = {
  "quesId":2721,
  "title":"execute asynchronous functions in parallel",
  "language":"js",
  "acceptedSolutions":["/**\r\n * @param {Array<Function>} functions\r\n * @return {Promise<any>}\r\n */\r\nvar promiseAll = async function(functions) {\r\n    try{\r\n        const promises = functions.map((fn) => fn());\r\n        const ans = await Promise.all(promises);\r\n        return ans;\r\n    }catch(err){\r\n        throw err;\r\n    }\r\n};\r\n\r\n/**\r\n * const promise = promiseAll([() => new Promise(res => res(42))])\r\n * promise.then(console.log); // [42]\r\n */","/**\r\n * @param {Array<Function>} functions\r\n * @return {Promise<any>}\r\n */\r\nvar promiseAll = async function(functions) {\r\n    try{\r\n        return await Promise.all(functions.map((fn) => fn()));\r\n    }catch(err){\r\n        throw err;\r\n    }\r\n};\r\n\r\n/**\r\n * const promise = promiseAll([() => new Promise(res => res(42))])\r\n * promise.then(console.log); // [42]\r\n */","/**\r\n * @param {Array<Function>} functions\r\n * @return {Promise<any>}\r\n */\r\nvar promiseAll = async function(functions) {\r\n    const promises = functions.map((fn) => fn());\r\n    return new Promise((resolve, reject) => {\r\n        const ans = [];\r\n        let promisesLeft = promises.length;\r\n        for(let i=0; i<promises.length; i++){\r\n            Promise.resolve(promises[i])\r\n            .then((result) => {\r\n                ans[i] = result;\r\n                promisesLeft--;\r\n                if(promisesLeft === 0)\r\n                    resolve(ans);\r\n            })\r\n            .catch((err) => {\r\n                reject(err);\r\n            });\r\n        }\r\n    });\r\n};\r\n\r\n/**\r\n * const promise = promiseAll([() => new Promise(res => res(42))])\r\n * promise.then(console.log); // [42]\r\n */","/**\r\n * @param {Array<Function>} functions\r\n * @return {Promise<any>}\r\n */\r\nvar promiseAll = async function(functions) {\r\n    const promises = functions.map((fn) => fn());\r\n    return new Promise((resolve, reject) => {\r\n        const ans = [];\r\n        let promisesLeft = promises.length;\r\n        promises.forEach((promise, index) => {\r\n            Promise.resolve(promise)\r\n            .then((result) => {\r\n                ans[index] = result;\r\n                promisesLeft--;\r\n                if(promisesLeft === 0)\r\n                    resolve(ans);\r\n            })\r\n            .catch((err) => {\r\n                reject(err);\r\n            });\r\n        });\r\n    });\r\n};\r\n\r\n/**\r\n * const promise = promiseAll([() => new Promise(res => res(42))])\r\n * promise.then(console.log); // [42]\r\n */"],
  "unacceptedSolutions":[]
  }
  
  const dummydata_cpp = {
  "quesId":295,
  "title":"find median from data stream",
  "language":"cpp",
  "acceptedSolutions":["class MedianFinder {\r\nprivate:\r\n    // for the elemnts in the 1st half of sorted array\r\n    priority_queue<int> maxHeap; \r\n    // for the elemnts in the 2nd half of sorted array\r\n    priority_queue<int, vector<int>, greater<int>> minHeap;\r\n\r\npublic:\r\n    MedianFinder() {\r\n\r\n    }\r\n    \r\n    void addNum(int num) {\r\n        // insert in max-heap by default\r\n        maxHeap.push(num);\r\n\r\n        int maxHeapSize = maxHeap.size();\r\n        int minHeapSize = minHeap.size();\r\n        \r\n        // pop from max-heap and push in min-heap\r\n        if(maxHeapSize - minHeapSize > 1)\r\n        {\r\n            minHeap.push(maxHeap.top());\r\n            maxHeap.pop();\r\n        }\r\n        // pop from min-heap and push in max-heap\r\n        else if(minHeapSize - maxHeapSize > 1)\r\n        {\r\n            maxHeap.push(minHeap.top());\r\n            minHeap.pop();\r\n        }\r\n\r\n        // swap the tops from both heaps\r\n        if(!maxHeap.empty() && !minHeap.empty() && maxHeap.top() > minHeap.top())\r\n        {\r\n            int curr1 = maxHeap.top();\r\n            int curr2 = minHeap.top();\r\n            maxHeap.pop();\r\n            minHeap.pop();\r\n            minHeap.push(curr1);\r\n            maxHeap.push(curr2);\r\n        }\r\n    }\r\n    \r\n    double findMedian() {\r\n        if(maxHeap.size() - minHeap.size() == 1)\r\n            return maxHeap.top();\r\n        else if(minHeap.size() - maxHeap.size() == 1)\r\n            return minHeap.top();\r\n        // maxHeap.size() == minHeap.size()\r\n        return (maxHeap.top() + minHeap.top()) / 2.0;\r\n    }\r\n};\r\n\r\n/*\r\n# max-heap is used to store the 1st half of sorted array\r\n# min-heap is used to store the 2nd half of sorted array\r\n# at any point the diff in size of both heaps is 0 or 1\r\n# if the diff in size of heaps is 1 then there are odd num of elements in sorted array,\r\nso median is the top of the larger size heap\r\n# if the diff in size of heaps is 0 then there are even num of elements in sorted array,\r\nso median is the avg. value of top of both heaps\r\n*/\r\n\r\n/**\r\n * Your MedianFinder object will be instantiated and called as such:\r\n * MedianFinder* obj = new MedianFinder();\r\n * obj->addNum(num);\r\n * double param_2 = obj->findMedian();\r\n */","class MedianFinder {\r\nprivate:\r\n    multiset<int> s;\r\n\r\npublic:\r\n    MedianFinder() {\r\n        s.clear();\r\n    }\r\n    \r\n    void addNum(int num) { // T.C.=O(logn)\r\n        s.insert(num);\r\n    }\r\n    \r\n    double findMedian() { // T.C.=O(n)\r\n        auto it = s.begin();\r\n        if(s.size() % 2 == 1)\r\n        {\r\n            int mid = s.size()/2;\r\n            advance(it, mid); // advance iterator by 'mid' positions\r\n            return *it;\r\n        }\r\n        int mid = s.size()/2 - 1;\r\n        advance(it, mid); // advance iterator by 'mid' positions\r\n        int val1 = *it;\r\n        it++;\r\n        return (val1 + *it) / 2.0;\r\n    }\r\n};\r\n\r\n/**\r\n * Your MedianFinder object will be instantiated and called as such:\r\n * MedianFinder* obj = new MedianFinder();\r\n * obj->addNum(num);\r\n * double param_2 = obj->findMedian();\r\n */"],
  "unacceptedSolutions":["class MedianFinder {\r\nprivate:\r\n    vector<int> nums;\r\n\r\npublic:\r\n    MedianFinder() {\r\n        nums.clear();\r\n    }\r\n    \r\n    void addNum(int num) { // T.C.=O(1)\r\n        nums.push_back(num);\r\n    }\r\n    \r\n    double findMedian() { // T.C.=O(n*logn)\r\n        sort(nums.begin(), nums.end());\r\n        int n=nums.size();\r\n        return (n % 2 == 1) ? nums[n/2] : (nums[n/2-1] + nums[n/2]) / 2.0;\r\n    }\r\n};\r\n\r\n/**\r\n * Your MedianFinder object will be instantiated and called as such:\r\n * MedianFinder* obj = new MedianFinder();\r\n * obj->addNum(num);\r\n * double param_2 = obj->findMedian();\r\n */","class MedianFinder {\r\nprivate:\r\n    vector<int> nums;\r\n\r\npublic:\r\n    MedianFinder() {\r\n        nums.clear();\r\n    }\r\n    \r\n    void addNum(int num) { // T.C.=O(n)\r\n        nums.push_back(num);\r\n        for(int i=nums.size()-1; i>=1; i--)\r\n        {\r\n            if(nums[i-1] > nums[i])\r\n                swap(nums[i-1], nums[i]);\r\n            else\r\n                break;\r\n        }\r\n    }\r\n    \r\n    double findMedian() { // T.C.=O(1)\r\n        int n=nums.size();\r\n        return (n % 2 == 1) ? nums[n/2] : (nums[n/2-1] + nums[n/2]) / 2.0;\r\n    }\r\n};\r\n\r\n/**\r\n * Your MedianFinder object will be instantiated and called as such:\r\n * MedianFinder* obj = new MedianFinder();\r\n * obj->addNum(num);\r\n * double param_2 = obj->findMedian();\r\n */"]
  }